import React from "react";
import { connect } from "react-redux";
import "./Transactions.scss";
import { Link } from "react-router-dom";

class Transactions extends React.Component {
  render() {
    const { transactions } = this.props;
    console.log(this.props);

    const transactionList = transactions.map(transaction => {
      if (transaction.actionTaken === "BOUGHT") {
        const fixedNum = parseFloat(transaction.amountSpent).toFixed(2);
        return (
          <div className="indieTransaction">
            Bought {transaction.numberOfShares} shares of {transaction.name} for{" "}
            {fixedNum} at {transaction.timeOfBuy}
            <hr />
          </div>
        );
      } else if (transaction.actionTaken === "SOLD") {
        const fixedNum = parseFloat(transaction.amountEarned).toFixed(2);
        return (
          <div className="indieTransaction">
            Sold {transaction.numberOfShares} shares of {transaction.name} for{" "}
            {fixedNum} at {transaction.timeOfSell}
            <hr />
          </div>
        );
      }
    });

    return (
      <div className="transactions">
        <div className="header">TRANSACTION HISTORY</div>
        <div className="back-home">
          <Link to="/">Back to Home</Link>
        </div>
        <div>{transactionList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps)(Transactions);
