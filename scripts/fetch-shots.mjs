#!/usr/bin/env node
/**
 * fetch-shots.mjs — download every screenshot out of the original PR bodies.
 *
 * Why this exists:
 *   GitHub serves PR attachments from /assets/<uid>/<guid>, which 302-redirects to a
 *   signed S3 URL carrying X-Amz-Expires=300. Five minutes. Hotlinking them from a
 *   static page is therefore impossible — the signature is dead long before anyone
 *   loads the page. The only fix is to follow the redirect once and keep the bytes.
 *
 * Usage:
 *   node scripts/fetch-shots.mjs            # download everything missing
 *   node scripts/fetch-shots.mjs --force    # re-download everything
 *
 * Requires Node 18+ (global fetch). No token needed — the repos are public.
 */

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, '..', 'public', 'shots');
const FORCE = process.argv.includes('--force');

const c = { d: '\x1b[2m', g: '\x1b[32m', y: '\x1b[33m', r: '\x1b[31m', x: '\x1b[0m' };

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

// Signed-URL chains hate keep-alive weirdness; one clean request each, small concurrency.
async function grab(item) {
  const dest = join(OUT, item.file);
  if (!FORCE && await exists(dest)) return { ...item, status: 'skip' };

  try {
    const res = await fetch(item.url, {
      redirect: 'follow',
      headers: {
        // GitHub is picky about clients it doesn't recognise on the asset redirect.
        'User-Agent': 'Mozilla/5.0 (casestudy-fetch-shots)',
        'Accept': 'image/*,video/*,*/*;q=0.8',
      },
    });

    if (!res.ok) return { ...item, status: 'fail', why: `HTTP ${res.status}` };

    const ct = res.headers.get('content-type') || '';
    if (/^text\/html/.test(ct)) {
      return { ...item, status: 'fail', why: 'got HTML (asset gone or login-walled)' };
    }

    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 1024) return { ...item, status: 'fail', why: `suspiciously small (${buf.length}B)` };

    // Correct the extension if the served type disagrees with our guess.
    let file = item.file;
    if (/video\//.test(ct) && file.endsWith('.png')) file = file.replace(/\.png$/, '.mp4');
    if (/image\/jpe?g/.test(ct)) file = file.replace(/\.png$/, '.jpg');
    if (/image\/gif/.test(ct)) file = file.replace(/\.png$/, '.gif');

    await writeFile(join(OUT, file), buf);
    return { ...item, file, status: 'ok', bytes: buf.length };
  } catch (err) {
    return { ...item, status: 'fail', why: err.message };
  }
}

async function pool(items, size, fn) {
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => {
    while (i < items.length) {
      const mine = items[i++];
      out.push(await fn(mine));
    }
  }));
  return out;
}

const manifest = JSON.parse(await readFile(join(HERE, 'manifest.json'), 'utf8'));
await mkdir(OUT, { recursive: true });

console.log(`${c.d}Fetching ${manifest.length} assets into shots/ …${c.x}\n`);

const results = await pool(manifest, 4, async (item) => {
  const r = await grab(item);
  const mark = r.status === 'ok' ? `${c.g}✓${c.x}` : r.status === 'skip' ? `${c.d}·${c.x}` : `${c.r}✗${c.x}`;
  const tail = r.status === 'ok' ? `${c.d}${(r.bytes / 1024).toFixed(0)}KB${c.x}`
             : r.status === 'skip' ? `${c.d}already have it${c.x}`
             : `${c.r}${r.why}${c.x}`;
  console.log(`  ${mark} ${r.file.padEnd(18)} ${c.d}PR #${r.pr}${c.x}  ${tail}`);
  return r;
});

const ok = results.filter(r => r.status === 'ok');
const skip = results.filter(r => r.status === 'skip');
const bad = results.filter(r => r.status === 'fail');

// Record whatever actually landed, so the site renders only real files.
const present = [...ok, ...skip].map(({ file, pr, type }) => ({ file, pr, type }));
await writeFile(join(OUT, 'index.json'), JSON.stringify(present, null, 1));

console.log(`\n${c.g}${ok.length} downloaded${c.x} · ${c.d}${skip.length} already present${c.x}` +
            (bad.length ? ` · ${c.r}${bad.length} failed${c.x}` : ''));

if (bad.length) {
  console.log(`\n${c.y}Failed assets — grab these by hand:${c.x}`);
  for (const b of bad) {
    console.log(`  PR #${b.pr}  ${b.file}\n    ${c.d}${b.url}${c.x}`);
  }
  console.log(`\n${c.d}Open the PR, right-click the image, "Save image as", and name it exactly as above.${c.x}`);
}

console.log(`\n${c.d}Done. Next.js reads public/shots/ at build time, so just run npm run build.${c.x}`);
