import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { getSpeechesFromDB } from "components/speech/speechAction";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { auth, googleAuthProvider } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0),
  },
  marginTopTwo: {
    marginTop: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const errorMsg = React.useRef("");

  const handleRedirectSignUp = () => {
    history.push("/signup");
  };

  const handleRedirectForgotPassword = () => {
    history.push("/forgotpassword");
  };

  const handleFormSubmit = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => {
        if (user.emailVerified) {
          dispatch(getSpeechesFromDB());
          history.push("/home");
        } else {
          auth.signOut();
          throw new Error("Please verify your Email");
        }
      })
      .catch((error) => {
        errorMsg.current = error.message;
      });
  };

  const handleSignInWithGoogle = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(() => dispatch(getSpeechesFromDB()))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
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
            error={errorMsg.current !== "" ? true : false}
            helperText={errorMsg.current !== "" ? errorMsg.current : null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            inputRef={register}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Divider />
          <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={handleSignInWithGoogle}
          >
            Sign in with Google
          </Button>
          <Divider />
          <Grid container className={classes.marginTopTwo}>
            <Grid item xs>
              <Link to="/forgotpassword" onClick={handleRedirectForgotPassword}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" onClick={handleRedirectSignUp}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
