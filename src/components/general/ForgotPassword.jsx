import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [emailSent, setEmailSent] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleFormSubmit = (data) => {
    auth
      .sendPasswordResetEmail(data.email)
      .then(() => {
        setEmailSent(true)
        setTimeout(() => {
          setEmailSent(false);
          setErrorMsg("");
        }, 5000);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h3" variant="h5">
          Enter your user account's verified email address and we will send you
          a password reset link.
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register}
            error={errorMsg !== "" ? true : false}
            helperText={errorMsg !== "" ? errorMsg : null}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Password Reset Email
          </Button>
        </form>
        {emailSent ? (
          <Typography component="h3" variant="h5">
            An Email has been sent to you for resetting password.
          </Typography>
        ) : null}
      </div>
    </Container>
  );
};

export default ForgotPassword;
