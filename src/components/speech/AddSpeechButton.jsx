import { Button, makeStyles } from "@material-ui/core";
import { Add as AddSharpIcon } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const AddSpeechButton = () => {
  const classes = useStyles();
  const history = useHistory();
  
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
