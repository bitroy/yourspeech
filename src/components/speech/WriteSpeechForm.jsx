import React from "react";
import {
  Button,
  createMuiTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
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
import {
  addNewSpeechToDB,
  editSpeechToDB,
  removeSpeechFromDB,
} from "./speechAction";
import Editor from "./Editor";

const useStyles = makeStyles((theme) => ({
  speechFormContainer: {
    margin: theme.spacing(4, 2),
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
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2)
    },
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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleBackClick = () => {
    history.push("/home");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = () => {
    dispatch(removeSpeechFromDB(id));
    history.push("/home");
  };

  const onSubmit = (data) => {
    const speech = {
      createdAt: new Date().valueOf(),
      createdBy: data.writer,
      title: data.title,
      editor: data.editor,
    };

    if (type === "edit") {
      dispatch(editSpeechToDB(id, speech));
    } else {
      dispatch(addNewSpeechToDB(speech));
    }

    history.push("/home");
  };

  const currentUser = firebase.auth().currentUser.displayName;

  return (
    <Paper elevation={10} className={classes.speechFormContainer}>
      <Grid container direction="column">
        <Grid item>
          <Button
            className={classes.backButton}
            onClick={handleBackClick}
            aria-label="Back to Home"
          >
            <ArrowBackIcon />
          </Button>
        </Grid>
        <Grid item>
          {type === "edit" ? (
            <Typography
              variant="h4"
              align="center"
            >
              Edit Your Speech
            </Typography>
          ) : (
            <Typography
              variant="h4"
              align="center"
            >
              Write Your Speech
            </Typography>
          )}
        </Grid>
        <Grid item container direction="column" spacing={1}>
          <form
            className={classes.speechForm}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid item>
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
            </Grid>
            <Grid item>
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
            </Grid>
            <Grid item>
              <Editor control={control} type={type} editorvalue={editor} />
            </Grid>
            <Grid item>
              {type === "edit" ? (
                <Grid container justify="space-between" className={classes.speechFormButtonGroup}>
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
                      onClick={handleClickOpen}
                      size="large"
                      startIcon={<DeleteRoundedIcon />}
                    >
                      Remove
                    </Button>
                  </ThemeProvider>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="speech-remove-confirmation"
                  >
                    <DialogTitle>Are you Sure?</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        <Typography variant="h6">
                          This speech will be permanently deleted
                        </Typography>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="contained"
                        onClick={handleRemoveClick}
                        color="primary"
                      >
                        Yes
                      </Button>
                      <Button
                        variant="contained"
                        onClick={handleClose}
                        color="primary"
                      >
                        No
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<SaveIcon />}
                  className={classes.speechFormButtonGroup}
                >
                  Save
                </Button>
              )}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default WriteSpeechForm;
