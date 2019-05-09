import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./Home.scss";
import { connect } from "react-redux";

class Home extends React.Component {
  render() {
    const { transactions, personalStocks } = this.props;
    return (
      <div className="home">
        <div className="header">WELCOME TO YOUR PORTFOLIO</div>
        <div>
          <button className="ui orange basic button">
            <Link to="/search">Search for Stocks</Link>
          </button>
        </div>
        <div>
          <button className="ui teal basic button">
            <Link to="/transactions">My Transactions</Link>
          </button>
        </div>
        <div>
          <button className="ui purple basic button">
            <Link to="/myStocks">My Stocks</Link>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Home);
