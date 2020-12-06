import { Fab, Grid, makeStyles, Typography } from "@material-ui/core";
import { Edit as EditIcon } from "@material-ui/icons";
import parse from "html-react-parser";
import React from "react";
import { useHistory } from "react-router-dom";
import database, { auth } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  readContainer: {
    margin: theme.spacing(2, "auto"),
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
    },
    [theme.breakpoints.up("sm")]: {
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
  floatingEditIcon: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ReadSpeech = () => {
  const classes = useStyles();
  const history = useHistory();
  const [editSpeech, setEditSpeech] = React.useState(false);

  const {
    id,
    createdAt,
    createdBy,
    title,
    editor,
  } = history.location.state.speech;

  const handleEditSpeech = () => {
    history.push(`/edit/${id}`, {
      speech: history.location.state.speech,
    });
  };

  const speechOwner = React.useMemo(() => {
    const uid = auth.currentUser.uid;
    return database
      .ref(`users/${uid}/speeches/${id}`)
      .once("value")
      .then(() => true)
      .catch(() => false);
  }, [id]);

  React.useEffect(() => {
    setEditSpeech(speechOwner);
  }, [speechOwner]);

  return (
    <Grid
      className={classes.readContainer}
      container
      spacing={2}
      direction="column"
    >
      {editSpeech ? (
        <Fab
          color="secondary"
          aria-label="edit"
          className={classes.floatingEditIcon}
          onClick={handleEditSpeech}
        >
          <EditIcon />
        </Fab>
      ) : null}
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
