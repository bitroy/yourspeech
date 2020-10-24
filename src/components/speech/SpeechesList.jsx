import React from "react";
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSpeechesFromDB } from "./speechAction";
import SpeechItem from "./SpeechItem";

const useStyles = makeStyles((theme) => ({
  cardList: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
}));

const SpeechesList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const speeches = useSelector(state => state.speeches);

  React.useEffect(() => {
    dispatch(getSpeechesFromDB());
  }, []);

  return (
    <div className={classes.cardsList}>
      {speeches ? speeches.map((speech) => <SpeechItem key={speech.id} speech={speech} />) : null}
    </div>
  );
};

export default SpeechesList;
