import { Divider } from "@material-ui/core";
import Filters from "components/filters/Filters";
import AddSpeechButton from "components/speech/AddSpeechButton";
import SpeechesList from "components/speech/SpeechesList";
import React from "react";

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

export default HomePage;
