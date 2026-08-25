import type { Phase, PullRequest } from '@/lib/data';
import type { ShotMap } from '@/lib/shots';
import { caption, formatDate } from '@/lib/format';
import { Shot } from './Shot';

function Node({ pr, shots }: { pr: PullRequest; shots: ShotMap }) {
  const isMerge = /^merge/i.test(pr.title);
  const isApi = pr.repo === 'talawa-api';

  return (
    <details className={`node${isMerge ? ' big' : ''}${isApi ? ' api' : ''}`}>
      <summary>
        <div className="n-top">
          <span className="n-num">
            {isApi && <span className="r">api </span>}#{pr.number}
          </span>
          <span className="n-title">{pr.title}</span>
          {pr.media.length > 0 && (
            <span className="n-shots">
              {pr.media.length} shot{pr.media.length > 1 ? 's' : ''}
            </span>
          )}
          <span className="n-date">{formatDate(pr.created)}</span>
        </div>
      </summary>
      <div className="n-body">
        <p>{pr.note}</p>
        {pr.media.length > 0 && (
          <div className="shots">
            {pr.media.map((m) => (
              <Shot
                key={m.file}
                media={m}
                resolved={shots[m.file] ?? null}
                caption={caption(m) || `Talawa Admin · PR #${pr.number}`}
              />
            ))}
          </div>
        )}
        <a className="n-link" href={pr.url} target="_blank" rel="noopener noreferrer">
          view pull request ↗
        </a>
      </div>
    </details>
  );
}

export function Timeline({ phases, shots }: { phases: Phase[]; shots: ShotMap }) {
  return (
    <div>
      {phases.map((phase) => (
        <div className="phase" key={phase.id}>
          <div className="phase-head">
            <span className="num">{phase.id}</span>
            <h3>{phase.name}</h3>
            <div className="when">{phase.when}</div>
            <p>{phase.blurb}</p>
          </div>
          <div className="track">
            {phase.prs.map((pr) => (
              <Node key={`${pr.repo}-${pr.number}`} pr={pr} shots={shots} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
