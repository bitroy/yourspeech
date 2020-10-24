const speechReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_NEW_SPEECH":
      return [...state, action.speech];
    case "EDIT_SPEECH":
      return state.map((speech) => {
        if (speech.id === action.id) {
          return {
            ...speech,
            ...action.speech,
          };
        }

        return speech;
      });
    case "REMOVE_SPEECH":
      return state.filter(speech => speech.id !== action.id);
    case "GET_ALL_SPEECHES":
      return action.speeches;
    default:
      return state;
  }
};

export default speechReducer;
