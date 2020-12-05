import React from "react";
import { useHistory } from "react-router-dom";
import WriteSpeechForm from "./WriteSpeechForm";

const EditSpeech = () => {
  const history = useHistory();
  const speech = history.location.state.speech;

  return <WriteSpeechForm type="edit" {...speech} />;
};

export default React.memo(EditSpeech);
