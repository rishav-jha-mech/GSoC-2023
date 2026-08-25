import styles from "./style.module.css";

const links: { href: string; label: string }[] = [
  { href: "#about", label: "About" },
  { href: "#timeline", label: "Timeline" },
  { href: "#code", label: "Sample" },
];

const TableOfContents = () => {
  return (
    <>
      <div className={styles.tableWrapper}>
        {links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};

export default TableOfContents;
