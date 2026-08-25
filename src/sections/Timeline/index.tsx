import styles from "./style.module.css";
import { pullRequests } from "../../data/prs";

const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const Timeline = () => {
  return (
    <div className={styles.wrapper} id="timeline">
      <h2 className={styles.heading}>Merged pull requests</h2>
      <p className={styles.subheading}>
        {pullRequests.length} PRs, Feb–Dec 2023, across talawa-admin and
        talawa-api. Verified against{" "}
        <code>git log --author=rishav-jha-mech</code> on both repos&apos;
        default branches.
      </p>
      <ul className={styles.list}>
        {pullRequests.map((pr) => (
          <li className={styles.item} key={`${pr.repo}-${pr.number}`}>
            <div className={styles.meta}>
              <span>{formatDate(pr.date)}</span>
              <span className={styles.repo}>{pr.repo}</span>
            </div>
            <h3 className={styles.title}>
              <a href={pr.url} target="_blank" rel="noreferrer">
                #{pr.number} {pr.title}
              </a>
            </h3>
            <div className={styles.stats}>
              {pr.filesChanged} file{pr.filesChanged === 1 ? "" : "s"}{" "}
              changed, <span className={styles.additions}>
                +{pr.insertions}
              </span>{" "}
              <span className={styles.deletions}>-{pr.deletions}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Timeline;
