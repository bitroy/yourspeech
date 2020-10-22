import database, { firebase } from "../../firebase/firebase";

export const addNewSpeech = (speech) => ({
  type: "ADD_NEW_SPEECH",
  speech
});

export const storeNewSpeech = (data = {}) => {
  return (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    const { title = "", editor = "", createdBy = "",  createdAt = "" } = data;
    const speech = { title, editor, createdBy, createdAt };

    database
      .ref(`users/${uid}/speeches`)
      .push(speech)
      .then((ref) => {
        dispatch(addNewSpeech({ id: ref.key, ...speech}));
      });
  };
}