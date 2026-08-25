'use client';

import type { Media, Phase, PullRequest } from '@/lib/data';
import type { ShotMap } from '@/lib/shots';
import { caption, formatDate } from '@/lib/format';
import { Shot } from './Shot';
import type { LightboxItem } from './LightboxProvider';
import { useState } from 'react';

/** Resolved siblings for a PR's shot strip, so the lightbox can step through it. */
function resolvedSiblings(media: Media[], shots: ShotMap, prNumber: number): LightboxItem[] {
  return media
    .map((m) => ({ m, resolved: shots[m.file] ?? null }))
    .filter((x): x is { m: Media; resolved: NonNullable<typeof x.resolved> } => !!x.resolved)
    .map(({ m, resolved }) => ({
      src: resolved.src,
      isVideo: resolved.isVideo,
      caption: caption(m) || `Talawa Admin · PR #${prNumber}`,
    }));
}

/**
 * A real two-lane git graph, not a decorative one: the "redesign" lane and the
 * "mainline" (develop → master) lane run the length of the phase, commits sit as
 * dots on whichever lane they actually shipped to, and a merge PR draws a curve
 * from the redesign lane into the mainline at the row it happened.
 *
 * Each row is its own small SVG (just that row's stretch of lane line, dot, and
 * merge arc) sitting next to an ordinary HTML button — not one big SVG per phase
 * with a foreignObject per row. That's what lets a PR's detail panel open right
 * underneath the row that was clicked instead of trailing the whole graph.
 */

const ROW_H = 64;
const LANE_X = { redesign: 34, mainline: 150 };
const isMerge = (pr: PullRequest) => !!pr.mergesToMainline;
const isFinal = (pr: PullRequest) => !!pr.mergesToMaster;

function ShotStrip({ pr, shots }: { pr: PullRequest; shots: ShotMap }) {
  const siblings = resolvedSiblings(pr.media, shots, pr.number);
  let idx = 0;
  return (
    <div className="shots">
      {pr.media.map((m) => {
        const resolved = shots[m.file] ?? null;
        const shotIndex = resolved ? idx++ : 0;
        return (
          <Shot
            key={m.file}
            media={m}
            resolved={resolved}
            caption={caption(m) || `Talawa Admin · PR #${pr.number}`}
            index={shotIndex}
            siblings={resolved ? siblings : undefined}
          />
        );
      })}
    </div>
  );
}

function RowGraphic({ pr, isLast }: { pr: PullRequest; isLast: boolean }) {
  const isApi = pr.repo === 'talawa-api';
  const merge = isMerge(pr);
  const final = isFinal(pr);
  const x = LANE_X[merge ? 'mainline' : 'redesign'];
  const mid = ROW_H / 2;

  return (
    <svg
      className="gg-row-svg"
      width={LANE_X.mainline + 24}
      height={ROW_H}
      viewBox={`0 0 ${LANE_X.mainline + 24} ${ROW_H}`}
    >
      {/* Lane lines run the full row height, plus a half-row lead-in so they read as continuous. */}
      <line x1={LANE_X.redesign} y1={0} x2={LANE_X.redesign} y2={isLast ? mid : ROW_H} className="gg-lane redesign" />
      <line x1={LANE_X.mainline} y1={0} x2={LANE_X.mainline} y2={isLast ? mid : ROW_H} className="gg-lane mainline" />
      {merge && (
        <path
          d={`M ${LANE_X.redesign} 0 C ${LANE_X.redesign} ${mid / 2}, ${x} ${mid / 2}, ${x} ${mid}`}
          className={`gg-merge-arc${final ? ' final' : ''}`}
          fill="none"
        />
      )}
      <circle
        cx={x}
        cy={mid}
        r={merge ? (final ? 9 : 7) : isApi ? 5 : 6}
        className={`gg-dot${merge ? ' merge' : ''}${final ? ' final' : ''}${isApi ? ' api' : ''}`}
      />
      {merge && <circle cx={x} cy={mid} r={final ? 4 : 3} className="gg-dot-core" />}
    </svg>
  );
}

function Node({
  pr,
  isLast,
  shots,
  open,
  onToggle,
}: {
  pr: PullRequest;
  isLast: boolean;
  shots: ShotMap;
  open: boolean;
  onToggle: () => void;
}) {
  const isApi = pr.repo === 'talawa-api';
  const merge = isMerge(pr);

  return (
    <div className="gg-row-wrap">
      <div className="gg-row-line">
        <RowGraphic pr={pr} isLast={isLast} />
        <button
          type="button"
          className={`gg-row${open ? ' open' : ''}${merge ? ' merge' : ''}`}
          onClick={onToggle}
          aria-expanded={open}
        >
          <span className="gg-num">
            {isApi && <span className="r">api </span>}#{pr.number}
          </span>
          <span className="gg-title">{pr.title}</span>
          {pr.media.length > 0 && (
            <span className="gg-shots">
              {pr.media.length} shot{pr.media.length > 1 ? 's' : ''}
            </span>
          )}
          <span className="gg-date">{formatDate(pr.created)}</span>
        </button>
      </div>

      {open && (
        <div className="gg-detail">
          <p>{pr.note}</p>
          {pr.media.length > 0 && <ShotStrip pr={pr} shots={shots} />}
          <a className="gg-link" href={pr.url} target="_blank" rel="noopener noreferrer">
            view pull request ↗
          </a>
        </div>
      )}
    </div>
  );
}

export function GitGraph({ phases, shots }: { phases: Phase[]; shots: ShotMap }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="gg-wrap">
      <div className="gg-lanes-label">
        <span style={{ left: LANE_X.redesign }}>adminUI-redesign</span>
        <span style={{ left: LANE_X.mainline }}>develop / master</span>
      </div>

      {phases.map((phase, pi) => (
        <div className="gg-phase" key={phase.id}>
          <div className="gg-phase-head">
            <span className="gg-phase-num">{phase.id}</span>
            <div>
              <h3>{phase.name}</h3>
              <div className="gg-when">{phase.when}</div>
              <p>{phase.blurb}</p>
            </div>
          </div>

          {phase.prs.map((pr, i) => {
            const id = `${pr.repo}-${pr.number}`;
            return (
              <Node
                key={id}
                pr={pr}
                isLast={i === phase.prs.length - 1}
                shots={shots}
                open={openId === id}
                onToggle={() => setOpenId(openId === id ? null : id)}
              />
            );
          })}

          {pi < phases.length - 1 && <div className="gg-phase-gap" />}
        </div>
      ))}
    </div>
  );
}
