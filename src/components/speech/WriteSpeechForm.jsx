import React from "react";
import {
  Button,
  createMuiTheme,
  makeStyles,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import {
  Save as SaveIcon,
  DeleteRounded as DeleteRoundedIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { history } from "routes/AppRouter";
import { firebase } from "../../firebase/firebase";
import { addNewSpeechToDB, editSpeechToDB, removeSpeechFromDB } from "./speechAction";
import Editor from "./Editor";

const useStyles = makeStyles((theme) => ({
  speechFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1, 2),
  },
  backButton: {
    justifyContent: "flex-start",
    maxWidth: "8px",
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
  },
}));

const removeButtonTheme = createMuiTheme({
  palette: {
    secondary: red,
  },
});

const WriteSpeechForm = ({ type, id, createdAt, createdBy, title, editor }) => {
  const classes = useStyles();
  const { register, control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleBackClick = React.useCallback(() => {
    history.push("/home");
  }, []);

  const handleRemoveClick = React.useCallback(() => {
    dispatch(removeSpeechFromDB(id));
    history.push("/home");
  });

  const onSubmit = (data) => {
    const speech = {
      createdAt: new Date().valueOf(),
      createdBy: data.writer,
      title: data.title,
      editor: data.editor,
    };

    if(type === "edit") {
      dispatch(editSpeechToDB(id, speech));
    } else {
      dispatch(addNewSpeechToDB(speech));
    }
    
    history.push("/home");
  };

  const currentUser = firebase.auth().currentUser.displayName;

  return (
    <Paper className={classes.speechFormContainer} elevation={6}>
      <Button
        className={classes.backButton}
        onClick={handleBackClick}
        aria-label="Back to Home"
      >
        <ArrowBackIcon />
      </Button>
      {type === "edit" ? (
        <Typography
          className={classes.speechFormHeader}
          variant="h4"
          align="center"
        >
          Edit Your Speech
        </Typography>
      ) : (
        <Typography
          className={classes.speechFormHeader}
          variant="h4"
          align="center"
        >
          Write Your Speech
        </Typography>
      )}
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
          defaultValue={type === "edit" ? createdBy : currentUser}
          inputRef={register}
          InputProps={{
            readOnly: true,
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
          defaultValue={type === "edit" ? title : null}
          autoFocus
          required
          fullWidth
        />
        <Editor control={control} type={type} editorvalue={editor} />
        <div className={classes.speechFormButtonGroup}>
          {type === "edit" ? (
            <>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
              >
                Update
              </Button>
              <ThemeProvider theme={removeButtonTheme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRemoveClick}
                  startIcon={<DeleteRoundedIcon />}
                >
                  Remove
                </Button>
              </ThemeProvider>
            </>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default WriteSpeechForm;
