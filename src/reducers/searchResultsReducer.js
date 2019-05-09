export default function SearchResultsReducer(state = {}, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case "SAVE_SEARCH_RESULTS":
      if (action.payload === undefined) newState = [];
      else newState = action.payload;
      return newState;
    default:
      return state;
  }
}
