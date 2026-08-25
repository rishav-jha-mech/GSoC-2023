import styles from "./style.module.css";

const About = () => {
  return (
    <div className={styles.wrapper} id="about">
      <h2>About</h2>
      <p>
        Google Summer of Code 2023 project with{" "}
        <a href="https://www.palisadoes.org/" target="_blank" rel="noreferrer">
          The Palisadoes Foundation
        </a>
        , redesigning the admin UI of Talawa, an open-source community
        management platform. The work moved the admin console off Ant Design
        and onto a self-authored Sass component system, restructured the
        organisation/user list views around a single reusable{" "}
        <code>OrgListCard</code> rather than parallel admin/super-admin
        variants, and kept talawa-api's GraphQL layer in sync with the new
        frontend along the way.
      </p>
      <p className={styles.mentors}>Mentors: Anwer Sayeed, Muskan Modi.</p>
      <div className={styles.links}>
        <a
          href="https://github.com/PalisadoesFoundation/talawa-admin"
          target="_blank"
          rel="noreferrer"
        >
          talawa-admin
        </a>
        <a
          href="https://github.com/PalisadoesFoundation/talawa-api"
          target="_blank"
          rel="noreferrer"
        >
          talawa-api
        </a>
        <a
          href="https://summerofcode.withgoogle.com/programs/2023"
          target="_blank"
          rel="noreferrer"
        >
          GSoC 2023
        </a>
      </div>
    </div>
  );
};

export default About;
