import React from "react";
import {
  Button,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Save as SaveIcon, CloseSharp as CloseSharpIcon } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { history } from "routes/AppRouter";
import { firebase } from "../../firebase/firebase";
import { storeNewSpeech } from "./speechAction";
import Editor from "./Editor";

const useStyles = makeStyles((theme) => ({
  speechFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1, 2),
  },
  speechForm: {
    margin: theme.spacing(2),
  },
  speechFormHeader: {
    margin: theme.spacing(2, 0),
  },
  speechFormCreatedBy: {
    margin: theme.spacing(0, 2),
  },
  speechFormButtonGroup: {
    display: "flex",
    justifyContent: "space-between",
  }
}));

const WriteSpeechForm = () => {
  const classes = useStyles();
  const { register, control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleCloseClick = React.useCallback((e) => {
    history.push("/home");
  }, []);

  const onSubmit = (data) => {
    const speech = {
      createdAt: new Date(),
      writer: data.writer,
      title: data.title,
      editor: data.editor,
    }
    dispatch(storeNewSpeech(speech));
    history.push("/home");
  }

  const currentUser = firebase.auth().currentUser.displayName;

  return (
    <Paper className={classes.speechFormContainer} elevation={6}>
      <Typography
        className={classes.speechFormHeader}
        variant="h4"
        align="center"
      >
        Write Your Speech
      </Typography>
      <form 
        className={classes.speechForm} 
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          id="speechwriter"
          name="writer"
          label="Created By"
          variant="outlined"
          defaultValue={currentUser}
          inputRef={register}
          InputProps={{
            readOnly: true
          }}
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          inputRef={register}
          id="speechtitle"
          label="Speech Title"
          name="title"
          autoFocus
          required
          fullWidth
        />
        <Editor control={control} />
        <div className={classes.speechFormButtonGroup}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="default"
            size="large"
            startIcon={<CloseSharpIcon />}
            onClick={handleCloseClick}
          >
            Close
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default WriteSpeechForm;
