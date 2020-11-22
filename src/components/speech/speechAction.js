import database, { firebase } from "../../firebase/firebase";

export const addNewSpeech = (speech) => ({
  type: "ADD_NEW_SPEECH",
  speech,
});

export const addNewSpeechToDB = (data = {}) => {
  return (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    const { createdAt = "", createdBy = "", title = "", editor = "" } = data;
    const speech = { createdAt, createdBy, title, editor };
    database
      .ref(`users/${uid}/speeches`)
      .push(speech)
      .then((ref) => {
        dispatch(addNewSpeech({ id: ref.key, ...speech }));
      });
  };
};

export const editSpeech = (id, speech) => ({
  type: "EDIT_SPEECH",
  id,
  speech,
});

export const editSpeechToDB = (id, speech) => {
  return (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    database
      .ref(`users/${uid}/speeches/${id}`)
      .update(speech)
      .then(() => {
        dispatch(editSpeech(id, speech));
      });
  };
};

export const removeSpeech = (id) => ({
  type: "REMOVE_SPEECH",
  id,
});

export const removeSpeechFromDB = (id) => {
  return (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    database
      .ref(`users/${uid}/speeches/${id}`)
      .remove()
      .then(() => {
        dispatch(removeSpeech({ id }));
      });
  };
};

export const getSpeeches = (speeches) => ({
  type: "GET_ALL_SPEECHES",
  speeches,
});

export const getSpeechesFromDB = () => {
  return (dispatch) => {
    const uid = firebase.auth().currentUser.uid;
    database
      .ref(`users/${uid}/speeches`)
      .once("value")
      .then((snapshot) => {
        const speeches = [];
        snapshot.forEach((chidlSnapshot) => {
          speeches.push({
            id: chidlSnapshot.key,
            ...chidlSnapshot.val(),
          });
        });
        dispatch(getSpeeches(speeches));
      });
  };
};
