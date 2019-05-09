export default function TransactionsReducer(state = [], action) {
  console.log(state);
  switch (action.type) {
    case "APPEND_TRANSACTIONS":
      let newState = state.slice(0);
      console.log("appending transacting");
      newState.push(action.payload);
      return newState;
    default:
      return state;
  }
}
