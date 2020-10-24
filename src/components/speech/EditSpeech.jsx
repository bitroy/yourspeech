import React from "react";
import { useSelector } from "react-redux";
import WriteSpeechForm from "./WriteSpeechForm";

const EditSpeech = (props) => {
  const speech = useSelector((state) =>
    state.speeches.find((speech) => speech.id === props.match.params.id)
  );
  return <WriteSpeechForm type="edit" {...speech} />;
};

export default EditSpeech;
