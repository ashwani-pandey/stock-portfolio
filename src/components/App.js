import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./Home";
import SearchContainer from "./SearchContainer";
import StockDetails from "./StockDetails";
import Transactions from "./Transactions";
import MyStocks from "./MyStocks";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={Home} />
            <Route path="/search" exact component={SearchContainer} />
            <Route path="/transactions" exact component={Transactions} />
            <Route path="/myStocks" exact component={MyStocks} />
            <Route path="/stockDetails" exact component={StockDetails} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
