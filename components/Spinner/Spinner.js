import React from "react";
import styles from "./Spinner.module.scss"; // Import SCSS module

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner1}></div>
    </div>
  );
};

export default Spinner;
