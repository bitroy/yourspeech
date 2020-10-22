import React from "react";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardItem: {
    margin: theme.spacing(1, 2),
    cursor: "pointer",
  },
}));

const SpeechItem = () => {
  const classes = useStyles();

  const handleCardClick = () => {
    console.log("Card Clicked!!");
  };

  return (
    <Card
      className={classes.cardItem}
      variant="outlined"
      onClick={handleCardClick}
    >
      <CardContent>
        <Typography variant="h5">Your First Speech</Typography>
        <Typography color="textSecondary">Word of the Day</Typography>
      </CardContent>
    </Card>
  );
};

export default SpeechItem;
