export default function PersonalStocksReducer(state = {}, action) {
  console.log(state);
  let newState = null,
    incomingKey = null;
  // check if the symbol already exists
  switch (action.type) {
    case "UPDATE_MYSTOCKS":
      incomingKey = action.payload.symbol;
      newState = Object.assign({}, state);
      if (incomingKey in newState) {
        // do something
        if (action.payload.actionTaken === "BOUGHT") {
          newState[incomingKey].numberOfShares += action.payload.numberOfShares;
          newState[incomingKey].amountSpent += action.payload.amountSpent;
        } else if (action.payload.actionTaken === "SOLD") {
          newState[incomingKey].numberOfShares -= action.payload.numberOfShares;
          newState[incomingKey].amountSpent -= action.payload.amountSpent;
          if (newState[incomingKey].numberOfShares === 0)
            delete newState[incomingKey];
        }
      } else {
        newState[incomingKey] = action.payload;
      }
      return newState;
    default:
      return state;
  }
}
