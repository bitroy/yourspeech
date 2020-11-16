import React from "react";
import { TextField, makeStyles, Paper, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { searchForSpeechText } from "./filtersAction";

const useStyles = makeStyles((theme) => ({
  marginAllTwo: {
    margin: theme.spacing(2),
  },
  marginLeftDownTwo: {
    margin: theme.spacing(0, 0, 2, 2)
  }
}));

const debounce = (cb, delay) => {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb();
    }, delay);
  }
}

const Filters = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, getValues } = useForm();

  const searchForText = debounce(() => {
    dispatch(searchForSpeechText(getValues("searchterm")));
  }, 950);

  return (
    <Paper className={classes.marginAllTwo}>
      <Grid container direction="column">
        <Grid item xs={12} className={classes.marginAllTwo}>
          <TextField
            id="searchspeeches"
            name="searchterm"
            label="Search for Speech"
            variant="outlined"
            inputRef={register}
            onChange={searchForText}
            autoFocus
            fullWidth
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default React.memo(Filters);
