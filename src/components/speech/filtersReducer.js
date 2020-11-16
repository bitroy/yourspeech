const filtersReducer = (
  state = {
    searchterm: "",
  },
  action
) => {
  switch (action.type) {
    case "SEARCH_FOR_SPEECH_TEXT":
      return {
        ...state,
        searchterm: action.searchterm,
      };
    default:
      return state;
  }
};

export default filtersReducer;
