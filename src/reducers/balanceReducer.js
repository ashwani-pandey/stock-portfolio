export default function BalanceReducer(state = {}, action) {
  switch (action.type) {
    case "UPDATE_BALANCE_DEDUCT":
      return state - action.payload;
    case "UPDATE_BALANCE_ADD":
      return state + action.payload;
    default:
      return state;
  }
}
