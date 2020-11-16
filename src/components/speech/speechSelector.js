const getSpeechesSelector = (speeches, { searchterm }) => {
  return speeches.filter((speech) => {
    return speech.editor.toLowerCase().includes(searchterm.toLowerCase());
  });
};

export default getSpeechesSelector;
