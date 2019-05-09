import React from "react";
import { connect } from "react-redux";
import { simpleAction, saveSearchedStocks } from "../actions";
import StockDetails from "./StockDetails";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

class SearchContainer extends React.Component {
  state = { searchedText: "" };

  componentDidMount() {}

  search = e => {
    this.props.saveSearchResults(e.target.value);
  };

  showIndieStockDetails(stock) {
    console.log(this);
    this.props.history.push({
      pathname: "/stockDetails",
      search: `sym=${stock["1. symbol"]}`,
      state: { stock: stock }
    });
  }

  render() {
    const { balance, personalStocks, searchResults, transactions } = this.props;
    const searchResultsList = searchResults.map(stock => {
      return (
        <div>
          <div
            onClick={this.showIndieStockDetails.bind(this, stock)}
            className="stock-name"
            key={stock["1. symbol"]}
          >
            {stock["2. name"]}
          </div>
          <hr />
        </div>
      );
    });

    return (
      <div className="stock-portfolio">
        <div className="back-home">
          <Link to="/">Back to Home</Link>
        </div>
        <div className="search-box">
          <input
            className="search-input"
            onChange={this.search}
            placeholder="Search with stock symbols"
          />
          <div className="search-results">
            <div>{searchResultsList}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveSearchResults: searchedText => {
      dispatch(saveSearchedStocks(searchedText));
    },
    simpleAction: () => {
      dispatch(simpleAction());
    }
  };
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
