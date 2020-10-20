import React from "react";
import Header from "./Header";
import styles from "../../styles/HomePage.module.css";
import UserInfoCard from "../user/UserInfoCard";
import SpeechesList from "../speech/SpeechesList";

const HomePage = () => (
  <>
    <Header />
    <div className={styles.layout_parent}>
      <div className={styles.layout_leftside}>
        <UserInfoCard />
      </div>
      <div className={styles.layout_rightside}>
        <SpeechesList />
      </div>
    </div>
  </>
);

export default HomePage;
