import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock:React.FC = () => {
  return (
    <h1 className={styles.root}>
      <span>👿</span>
      <br />
      Oooops...
    </h1>
  );
};

export default NotFoundBlock;
