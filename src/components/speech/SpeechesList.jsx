import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import getSpeechesSelector from "./speechSelector";
import SpeechItem from "./SpeechItem";

const SpeechesList = () => {
  const speeches = useSelector((state) =>
    getSpeechesSelector(state.speeches, state.filters)
  );

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        {speeches
          ? speeches.map((speech) => (
              <SpeechItem key={speech.id} speech={speech} />
            ))
          : null}
      </Grid>
    </Grid>
  );
};

export default React.memo(SpeechesList);
