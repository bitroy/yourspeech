import React from "react";
import { history } from "../../routes/AppRouter";
import styles from "../../styles/Header.module.css";

const Header = () => {
  const handleClick = (url) => {
    history.push(url);
  };

  return (
    <div className={styles.navbar}>
      <div
        className={styles.navbar__div}
        onClick={() => handleClick("/home")}
      >
        YourSpeech
      </div>
      <div className={styles.navbar__div}>
        <input type="text" name="" id=""/>
      </div>
    </div>
  );
};

export default Header;
