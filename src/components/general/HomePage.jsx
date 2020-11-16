import React from "react";
import { Divider } from "@material-ui/core";
import AddSpeechButton from "components/speech/AddSpeechButton";
import SpeechesList from "components/speech/SpeechesList";
import Filters from "components/speech/Filters";

const HomePage = () => {
  return (
    <>
      <AddSpeechButton />
      <Divider />
      <Filters />
      <Divider />
      <SpeechesList />
    </>
  );
};

export default React.memo(HomePage);
