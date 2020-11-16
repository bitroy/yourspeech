import React from "react";
import {
  Card,
  CardActions,
  CardHeader,
  Collapse,
  Divider,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  ExpandMore as ExpandMoreIcon,
  EditSharp as EditSharpIcon,
} from "@material-ui/icons";
import parse from "html-react-parser";
import clsx from "clsx";
import { history } from "../../routes/AppRouter";

const useStyles = makeStyles((theme) => ({
  cardItem: {
    margin: theme.spacing(2),
  },
  editorContent: {
    margin: theme.spacing(0, 2),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const SpeechItem = ({ speech }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { id, createdAt, title, editor } = speech;
  const renderDate = new Date(createdAt).toLocaleString();

  const handleEditSpeech = () => {
    history.push(`/edit/${id}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card elevation={5} className={classes.cardItem}>
      <CardActions disableSpacing>
        <CardHeader title={title} subheader={renderDate} />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Expand Speech"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Divider />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid container justify="flex-end">
          <IconButton
            className={classes.editButton}
            aria-label="Edit Speech"
            onClick={handleEditSpeech}
          >
            <EditSharpIcon />
          </IconButton>
        </Grid>
        <Divider />
        <Typography className={classes.editorContent} variant="body2">
          {parse(editor)}
        </Typography>
      </Collapse>
    </Card>
  );
};

export default React.memo(SpeechItem);
