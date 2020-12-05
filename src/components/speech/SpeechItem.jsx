import {
  Card,
  CardContent,
  Divider,
  makeStyles,
  Typography
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  cardItem: {
    margin: theme.spacing(2),
  },
  cardItemHeader: {
    fontSize: "2rem",
    fontWeight: "bold",
    cursor: "pointer",
  },
  cardItemFooter: {
    fontSize: "1rem",
  },
}));

const SpeechItem = ({ speech }) => {
  const classes = useStyles();
  const history = useHistory();

  const { id, createdAt, createdBy, title, editor } = speech;
  const renderDate = new Date(createdAt).toLocaleString();

  const handleReadSpeech = () => {
    history.push(`/read/${id}`, {
      speech: {
        id,
        createdAt: renderDate,
        createdBy,
        title,
        editor,
      },
    });
  };

  return (
    <Card className={classes.cardItem}>
      <CardContent>
        <Typography
          className={classes.cardItemHeader}
          onClick={handleReadSpeech}
        >
          {title}
        </Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography className={classes.cardItemFooter}>
          {createdBy} | {renderDate}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpeechItem;
