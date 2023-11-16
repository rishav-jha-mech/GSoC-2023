import styles from "./style.module.css";
import TalawaIcon from "../../assets/svgs/talawa.svg?react";

const HeroSection = () => {
  return (
    <>
      <div className={styles.sectionWrapper}>
        <h1 className={styles.jumboTron}>Welcome to the Future of Talawa Admin! 🚀</h1>
        <TalawaIcon className={styles.talawaIcon} />
        <p className="text-center fw-medium text-dark fs-4 mt-2">Talawa Admin UI Redesign</p>
      </div>
    </>
  );
};

export default HeroSection;
