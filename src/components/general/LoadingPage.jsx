import React from "react";
import loadermp4 from "../../images/loader.mp4";
import loaderwebm from "../../images/loader.webm";
import styles from "../../styles/LoadingPage.module.css";

const LoadingPage = () => {
  return (
    <div className={styles.pageloader}>
      <video autoPlay loop muted playsInline>
        <source src={loaderwebm} type="video/webm" />
        <source src={loadermp4} type="video/mp4" />
      </video>
    </div>
  );
};

export default LoadingPage;
