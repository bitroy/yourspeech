import React from "react";
import { makeStyles } from "@material-ui/core";
import SpeechesList from "components/speech/SpeechesList";

const useStyles = makeStyles((theme) => ({
  speechContainer: {
    display: "flex",
  },
}));

const SpeechContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.speechContainer}>
      <SpeechesList />
    </div>
  );
};

export default SpeechContainer;
