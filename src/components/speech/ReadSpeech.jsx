import { Grid, makeStyles, Typography } from "@material-ui/core";
import parse from "html-react-parser";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  readContainer: {
    margin: theme.spacing(2, "auto"),
    [theme.breakpoints.down("xs")] : {
      maxWidth: "90%",
    },
    [theme.breakpoints.up("sm")] : {
      maxWidth: "50%",
    },
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  content: {
    fontSize: "1rem",
  },
}));

const ReadSpeech = () => {
  const classes = useStyles();
  const history = useHistory();
  const { createdAt, createdBy, title, editor } = history.location.state.speech;

  return (
    <Grid
      className={classes.readContainer}
      container
      spacing={2}
      direction="column"
    >
      <Grid item>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item>
        <Typography>
          {createdBy} | {createdAt}
        </Typography>
      </Grid>
      <Grid item className={classes.content}>
        <Typography>{parse(editor)}</Typography>
      </Grid>
    </Grid>
  );
};

export default ReadSpeech;
