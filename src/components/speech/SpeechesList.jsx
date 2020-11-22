import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import SpeechItem from "./SpeechItem";
import getSpeechesSelector from "./speechSelector";

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
