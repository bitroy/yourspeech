import React from "react";
import { Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const useStyles = makeStyles((theme) => ({
  wrapperStyle: {
    height: "45vh",
    marginTop: theme.spacing(),
  },
  quillStyle: {
    height: "80%",
  },
}));

const Editor = (props) => {
  const classes = useStyles();
  const { control, type, editorvalue } = props;

  return (
    <div className={classes.wrapperStyle}>
      <Controller
        control={control}
        name="editor"
        rules={{ required: true }}
        defaultValue={type === "edit" ? editorvalue : ""}
        render={({ onChange, value }) => (
          <ReactQuill
            className={classes.quillStyle}
            theme="snow"
            value={value || ""}
            onChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default React.memo(Editor);
