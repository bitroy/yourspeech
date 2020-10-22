const speechReducer = (state = [], action) => {
  console.log(action.speech);
  switch(action.type) {
    case "ADD_NEW_SPEECH":
      return [...state, action.speech]
    default:
      return state;
  }
};

export default speechReducer;