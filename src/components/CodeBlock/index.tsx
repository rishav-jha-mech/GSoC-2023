import styles from "./style.module.css";

type Props = {
  text: string;
  fileName: string;
};

const CodeBlock = (props: Props) => {
  const { text, fileName } = props;
  return (
    <>
      <div className={styles.codeWrapper}>
        <pre className={styles.codeContainer}>
          <span className={styles.fileName}>{fileName}</span>
          <code>{text}</code>
        </pre>
      </div>
    </>
  );
};

export default CodeBlock;
