import React from "react";
import { connect } from "react-redux";
import "./StockDetails.scss";
import {
  getIndieStockPrices,
  updateBalanceDeduct,
  appendTransactions,
  updateMyStocks
} from "../actions";

class StockDetails extends React.Component {
  state = {
    stock: this.props.location.state.stock,
    advancedDetails: null,
    lastRefreshed: null,
    sharesToBuy: 0,
    errorMessage: null
  };

  componentDidMount() {
    // add the code to fetch intra day details
    this.props.getIndieStockPrices(this);
  }

  handleBuy(event) {
    // code for all the actions on buying share goes here
    event.preventDefault();
    const { balance } = this.props;
    if (this.state.sharesToBuy !== 0) {
      // check the balance and see if this much of amount is there or not
      const toBeDeducted =
        this.state.sharesToBuy * this.state.advancedDetails["4. close"];
      if (toBeDeducted <= balance) {
        this.props.updateBalanceDeduct(toBeDeducted);
        // append this stock to transactions data and my stocks section
        let otherDetails = {
          timeOfBuy: this.state.lastRefreshed,
          numberOfShares: this.state.sharesToBuy,
          amountSpent: toBeDeducted
        };
        this.props.updateTransactionsAndStocks(
          this.state.stock,
          this.state.advancedDetails,
          otherDetails
        );
        // switch the page back to home page
        this.props.history.push("/");
      } else {
        this.setState({
          errorMessage: "You only have a balance of " + balance + " units."
        });
      }
    } else {
      this.setState({
        errorMessage: "Please buy a minimum of one share"
      });
    }
  }

  handleInputChange(event) {
    event.preventDefault();
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      const inputInteger = parseInt(inputValue);
      if (Number.isInteger(inputInteger) && inputInteger >= 0) {
        this.setState({
          sharesToBuy: parseInt(event.target.value),
          errorMessage: null
        });
      } else {
        this.setState({
          errorMessage: "Enter a positive integer"
        });
      }
    } else {
      this.setState({
        errorMessage: "The value you have entered is not a number"
      });
    }
  }

  render() {
    console.log(this.props.balance);
    console.log(this.props.personalStocks);

    const advancedDeets = this.state.advancedDetails;
    let advancedDetailsDiv = null,
      errorMessageDiv = null;

    if (this.state.errorMessage !== null) {
      errorMessageDiv = (
        <div className="ui error message">
          <div className="header">{this.state.errorMessage}</div>
        </div>
      );
    }

    if (advancedDeets !== null) {
      advancedDetailsDiv = (
        <div className="advanced">
          <div className="advanced-deet">Open : {advancedDeets["1. open"]}</div>
          <div className="advanced-deet">High : {advancedDeets["2. high"]}</div>
          <div className="advanced-deet">Low : {advancedDeets["3. low"]}</div>
          <div className="advanced-deet">
            Close : {advancedDeets["4. close"]}
          </div>
          <div className="advanced-deet">
            Volume : {advancedDeets["5. volume"]}
          </div>
          <div className="advanced-deet">
            Last Refreshed : {this.state.lastRefreshed}
          </div>
        </div>
      );
    }

    return (
      <div className="stock-details">
        <div className="header">Stock Details</div>
        <div className="basic">
          <div className="basic-deet">Name : {this.state.stock["2. name"]}</div>
          <div className="basic-deet">Type : {this.state.stock["3. type"]}</div>
          <div className="basic-deet">
            Region : {this.state.stock["4. region"]}
          </div>
          <div className="basic-deet">
            Currency : {this.state.stock["8. currency"]}
          </div>
        </div>
        {advancedDetailsDiv}
        <div className="buy">
          <div className="shares-number">
            <form className="ui form">
              <div className="field">
                <input
                  type="text"
                  name="shares"
                  placeholder="How many shares?"
                  maxLength="2"
                  onChange={this.handleInputChange.bind(this)}
                />
              </div>
            </form>
          </div>

          <div className="shares-decision">
            <button
              className="ui primary basic button"
              onClick={this.handleBuy.bind(this)}
            >
              Buy
            </button>
          </div>
        </div>
        <div className="error">{errorMessageDiv}</div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getIndieStockPrices: (self, symbol) => {
      dispatch(getIndieStockPrices(self, symbol));
    },
    updateBalanceDeduct: toBeDeducted => {
      dispatch(updateBalanceDeduct(toBeDeducted));
    },
    updateTransactionsAndStocks: (stock, advancedDetails, otherDetails) => {
      let stockObj = Object.assign({}, otherDetails);
      stockObj.symbol = stock["1. symbol"];
      stockObj.name = stock["2. name"];
      stockObj.actionTaken = "BOUGHT";
      const transactionObj = Object.assign({}, stockObj);
      dispatch(appendTransactions(transactionObj));
      dispatch(updateMyStocks(stockObj));
    }
  };
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(StockDetails);
