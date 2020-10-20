import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebase, uiConfig } from "../../firebase/firebase";
import styles from "../../styles/LoginPage.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container_login}>
      <div className={styles.page_header}>
        <div className={styles.page_header__text}>Your Speeches</div>
      </div>
      <div className={styles.box_layout}>
        <div className={styles.box_layout__box}>
          <div className={styles.box_layout__name}>Login to Write Speeches</div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
