import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Add as AddSharpIcon } from "@material-ui/icons";
import { history } from "../../routes/AppRouter";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const AddSpeechButton = () => {
  const classes = useStyles();
  
  const handleClick = () => {
    history.push("/add");
  };

  return (
    <Button
      className={classes.margin}
      variant="contained"
      color="primary"
      startIcon={<AddSharpIcon />}
      onClick={handleClick}
    >
      New Speech
    </Button>
  );
};

export default React.memo(AddSpeechButton);
