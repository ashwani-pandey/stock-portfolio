import React from "react";
import { connect } from "react-redux";
import "./MyStocks.scss";
import { Link } from "react-router-dom";
import { updateAfterSelling } from "../actions";

class MyStocks extends React.Component {
  state = {
    sharesToSell: 0,
    errorMessage: null
  };

  handleSell(self, event, sym) {
    // code for all the actions on selling share goes here
    event.preventDefault();
    const { balance, personalStocks, transactions } = self.props;
    const availableShares = personalStocks[sym].numberOfShares;
    console.log(personalStocks);
    console.log(availableShares);
    console.log(transactions);

    if (this.state.sharesToSell !== 0) {
      // check if there are that many shares with him that he is selling

      if (this.state.sharesToSell <= availableShares) {
        // update balance and transactions and stocks accordingly
        this.props.updateAfterSelling(self, sym);
        this.props.history.push("/");
      } else {
        this.setState({
          errorMessage:
            "You only have " +
            { availableShares } +
            " shares of this specific company"
        });
      }
    } else {
      this.setState({
        errorMessage: "Please sell a minimum of one share"
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
          sharesToSell: parseInt(event.target.value),
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
    const { personalStocks, balance } = this.props;
    let errorMessageDiv = null;

    if (this.state.errorMessage !== null) {
      errorMessageDiv = (
        <div className="ui error message">
          <div className="header">{this.state.errorMessage}</div>
        </div>
      );
    }

    const personalStocksList = Object.keys(personalStocks).map((key, index) => {
      let stock = personalStocks[key];
      return (
        <div className="indie-stock" id={stock.symbol}>
          <div className="indie-stock-text">
            {stock.name} - {stock.numberOfShares} shares
          </div>
          <div className="sell">
            <div className="shares-number">
              <form className="ui form">
                <div className="field">
                  <input
                    type="text"
                    name="shares"
                    placeholder="Shares to sell?"
                    maxLength="2"
                    onChange={this.handleInputChange.bind(this)}
                  />
                </div>
              </form>
            </div>

            <div className="shares-decision">
              <button
                className="ui primary basic button"
                onClick={e => this.handleSell(this, e, stock.symbol)}
              >
                Sell
              </button>
            </div>
          </div>
          <hr />
        </div>
      );
    });

    return (
      <div className="my-stocks">
        <div className="header">MY PERSONAL STOCKS</div>
        <div className="back-home">
          <Link to="/">Back to Home</Link>
        </div>
        <h2 className="balance">BALANCE : {balance}</h2>
        <div className="personal-stocks-list">{personalStocksList}</div>
        <div className="error">{errorMessageDiv}</div>
        <div>
          <button className="ui blue basic button">
            <Link to="/search">Search for current pricings</Link>
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateAfterSelling: (self, sym) => {
      dispatch(updateAfterSelling(self, sym));
    }
  };
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(MyStocks);
