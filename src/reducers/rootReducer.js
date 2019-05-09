import { combineReducers } from "redux";
import BalanceReducer from "./balanceReducer";
import TransactionsReducer from "./transactionsReducer";
import PersonalStocksReducer from "./personalStocksReducer";
import SimpleReducer from "./simpleReducer";
import SearchResultsRedcuer from "./searchResultsReducer";
/*
export default combineReducers({
  simpleReducer
});
*/

export function defState() {
  let balance = 1000;
  let transactions = [];
  let personalStocks = {};
  let simple = {};
  let searchResults = [];
  return {
    balance: balance,
    transactions: transactions,
    personalStocks: personalStocks,
    simple: simple,
    searchResults: searchResults
  };
}

export function rootReducer(state = defState(), action) {
  return {
    balance: BalanceReducer(state.balance, action),
    transactions: TransactionsReducer(state.transactions, action),
    personalStocks: PersonalStocksReducer(state.personalStocks, action),
    simple: SimpleReducer(state.simple, action),
    searchResults: SearchResultsRedcuer(state.searchResults, action)
  };
}
