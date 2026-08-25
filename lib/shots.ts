import fs from 'node:fs';
import path from 'node:path';
import type { Media } from './data';
import type { ResolvedShot } from './format';
import { ALL_MEDIA } from './data';

/**
 * Where screenshots come from, and why this file exists.
 *
 * GitHub serves pull-request attachments from
 *   github.com/<org>/<repo>/assets/<uid>/<guid>
 * which 302-redirects to a signed S3 URL carrying `X-Amz-Expires=300`. Five
 * minutes. The signature is dead long before a visitor loads the page, so those
 * URLs can never be hotlinked from a static site. 33 of this project's 37 assets
 * use that scheme.
 *
 * The four oldest PRs (#498, #512, #534, #543) predate it and sit on
 * user-images.githubusercontent.com, which is permanent and safe to hotlink.
 *
 * So: prefer a local copy under public/shots, fall back to the URL only when it's
 * one of the permanent ones, and otherwise render a placeholder rather than a
 * broken image. Run `npm run shots` to fill public/shots.
 */

const SHOTS_DIR = path.join(process.cwd(), 'public', 'shots');

/** Filenames actually present on disk, read once at build time. */
function filesOnDisk(): Set<string> {
  try {
    return new Set(
      fs.readdirSync(SHOTS_DIR).filter((f) => !f.startsWith('.') && !f.endsWith('.json')),
    );
  } catch {
    return new Set();
  }
}

const isPermanentUrl = (url: string) => url.includes('user-images.githubusercontent.com');

function resolveOne(media: Media, onDisk: Set<string>): ResolvedShot | null {
  const base = media.file.replace(/\.[^.]+$/, '');

  // The fetch script corrects extensions against the served content-type, so a
  // .png in the manifest may have landed as .jpg or .mp4.
  for (const ext of ['png', 'jpg', 'jpeg', 'gif', 'mp4', 'webp']) {
    const candidate = `${base}.${ext}`;
    if (onDisk.has(candidate)) {
      return {
        src: `/shots/${candidate}`,
        isVideo: ext === 'mp4' || media.type === 'video',
        local: true,
      };
    }
  }

  if (isPermanentUrl(media.url)) {
    return { src: media.url, isVideo: media.type === 'video', local: false };
  }

  return null;
}

/** file → resolved source, or null when it needs downloading. */
export type ShotMap = Record<string, ResolvedShot | null>;

export function buildShotMap(): ShotMap {
  const onDisk = filesOnDisk();
  const map: ShotMap = {};
  for (const { media } of ALL_MEDIA) {
    map[media.file] = resolveOne(media, onDisk);
  }
  return map;
}

export function shotStats(map: ShotMap) {
  const total = Object.keys(map).length;
  const ready = Object.values(map).filter(Boolean).length;
  return { total, ready, missing: total - ready };
}

export type { ResolvedShot } from './format';
export { caption, formatDate } from './format';
