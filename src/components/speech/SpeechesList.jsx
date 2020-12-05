import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import SpeechItem from "./SpeechItem";
import getSpeechesSelector from "./speechSelector";

const useStyles = makeStyles((theme) => ({
  cardsList: {
    display: "grid",
    [theme.breakpoints.down('xs')]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
    [theme.breakpoints.up('sm')]: {
      gridTemplateColumns: "repeat(2, 1fr)"
    }
  },
}));

const SpeechesList = () => {
  const classes = useStyles();

  const speeches = useSelector((state) =>
    getSpeechesSelector(state.speeches, state.filters)
  );

  return (
    <Grid container className={classes.cardsList}>
      {speeches
        ? speeches.map((speech) => (
            <SpeechItem key={speech.id} speech={speech} />
          ))
        : null}
    </Grid>
  );
};

export default React.memo(SpeechesList);
