export function searchedStocks(searchedText) {
  return fetch(
    "https://www.x.co/query?function=SYMBOL_SEARCH&keywords=" +
      searchedText +
      "&apikey=QEGLRCSL8D99KCIR"
  ).then(response => {
    return response.json();
  });
}

export function intraDayTimeSeries(stockSymbol) {
  return fetch(
    "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
      stockSymbol +
      "&interval=5min&apikey=QEGLRCSL8D99KCIR"
  ).then(response => {
    return response.json();
  });
}
