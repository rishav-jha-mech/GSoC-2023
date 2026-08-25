import type { Metadata } from 'next';
import { META, PHASES } from '@/lib/data';
import { buildShotMap } from '@/lib/shots';
import { GitGraph } from '@/components/GitGraph';

export const metadata: Metadata = {
  title: `Timeline — ${META.project}`,
  description: 'Every pull request across talawa-admin and talawa-api, drawn as a branch graph.',
};

export default function TimelinePage() {
  const shots = buildShotMap();

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <span className="section-tag">The branch</span>
          <h1>Every pull request, in order</h1>
          <p className="section-lede">
            All {META.prCount} PRs across both repos, drawn the way <code>git log --graph</code>{' '}
            would draw them: the redesign lane on the left, develop and master on the
            right. Amber dots are backend work in <span className="k">talawa-api</span>.
            Click any row to open what it changed.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap wide">
          <GitGraph phases={PHASES} shots={shots} />
        </div>
      </section>
    </>
  );
}
