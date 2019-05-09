import * as Services from "./service";

export function simpleAction() {
  return {
    type: "SIMPLE_ACTION",
    payload: "result_of_simple_action"
  };
}

export function saveSearchResults(data) {
  return {
    type: "SAVE_SEARCH_RESULTS",
    payload: data.bestMatches
  };
}

export function updateBalanceDeduct(toBeDeducted) {
  return {
    type: "UPDATE_BALANCE_DEDUCT",
    payload: toBeDeducted
  };
}

export function updateBalanceAdd(toBeAdded) {
  return {
    type: "UPDATE_BALANCE_ADD",
    payload: toBeAdded
  };
}

export function appendTransactions(stockObj) {
  return {
    type: "APPEND_TRANSACTIONS",
    payload: stockObj
  };
}

export function updateMyStocks(stockObj) {
  return {
    type: "UPDATE_MYSTOCKS",
    payload: stockObj
  };
}

export function updateAfterSelling(self, sym) {
  const { balance, personalStocks } = self.props;
  return (dispatch, getState) => {
    Services.intraDayTimeSeries(sym)
      .then(data => {
        // update the balance according to the data
        const recentTime = Object.keys(data["Time Series (5min)"])[0];
        const recentTimeClose =
          data["Time Series (5min)"][recentTime]["4. close"];
        const toBeAdded = self.state.sharesToSell * recentTimeClose;
        dispatch(updateBalanceAdd(toBeAdded));

        // append the transaction
        const stockObj = {
          actionTaken: "SOLD",
          timeOfSell: recentTime,
          numberOfShares: self.state.sharesToSell,
          amountEarned: toBeAdded,
          symbol: sym,
          name: personalStocks[sym].name
        };
        console.log("appending transactions after selling");
        const transactionObj = Object.assign({}, stockObj);
        dispatch(appendTransactions(transactionObj));

        // update the personal stocks section
        dispatch(updateMyStocks(stockObj));
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function getIndieStockPrices(self) {
  return (dispatch, getState) => {
    Services.intraDayTimeSeries(self.state.stock["1. symbol"])
      .then(data => {
        const recentTime = Object.keys(data["Time Series (5min)"])[0];
        self.setState({
          advancedDetails: data["Time Series (5min)"][recentTime],
          lastRefreshed: recentTime
        });
      })
      .catch(err => {
        console.log(err);

        let data = {
          "Time Series (5min)": {
            "2019-05-08 15:10:00": {
              "1. open": "126.0200",
              "2. high": "126.0900",
              "3. low": "125.9600",
              "4. close": "126.0100",
              "5. volume": "101658"
            }
          }
        };

        const recentTime = Object.keys(data["Time Series (5min)"])[0];
        self.setState({
          advancedDetails: data["Time Series (5min)"][recentTime],
          lastRefreshed: recentTime
        });
      });
  };
}

export function saveSearchedStocks(searchedText) {
  return (dispatch, getState) => {
    Services.searchedStocks(searchedText)
      .then(data => {
        dispatch(saveSearchResults(data));
      })
      .catch(err => {
        console.log(err);
        const data = {
          bestMatches: [
            {
              "1. symbol": "X",
              "2. name": "United States Steel Corporation",
              "3. type": "Equity",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "1.0000"
            },
            {
              "1. symbol": "XYF",
              "2. name": "X Financial",
              "3. type": "Equity",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.5000"
            },
            {
              "1. symbol": "XOM",
              "2. name": "Exxon Mobil Corporation",
              "3. type": "Equity",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.5000"
            },
            {
              "1. symbol": "XXII",
              "2. name": "22nd Century Group Inc.",
              "3. type": "Equity",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.5000"
            },
            {
              "1. symbol": "XLNX",
              "2. name": "Xilinx Inc.",
              "3. type": "Equity",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.5000"
            },
            {
              "1. symbol": "XPO",
              "2. name": "XPO Logistics Inc.",
              "3. type": "Equity",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.5000"
            },
            {
              "1. symbol": "XLK",
              "2. name": "Technology Select Sector SPDR Fund",
              "3. type": "ETF",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.5000"
            },
            {
              "1. symbol": "XLE",
              "2. name": "Energy Select Sector SPDR Fund",
              "3. type": "ETF",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.4000"
            },
            {
              "1. symbol": "XLF",
              "2. name": "Financial Select Sector SPDR Fund",
              "3. type": "ETF",
              "4. region": "United States",
              "5. marketOpen": "09:30",
              "6. marketClose": "16:00",
              "7. timezone": "UTC-04",
              "8. currency": "USD",
              "9. matchScore": "0.4000"
            }
          ]
        };
        dispatch(saveSearchResults(data));
      });
  };
}
