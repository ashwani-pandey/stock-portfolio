import React from "react";
import { connect } from "react-redux";
import "./Balance.scss";
import { Link } from "react-router-dom";
import { updateBalanceAdd, updateBalanceDeduct } from "../actions";

class Balance extends React.Component {
  state = { inputNumber: 0, errorMessage: null };
  handleInputChange(event) {
    event.preventDefault();
    const inputValue = event.target.value;
    if (!isNaN(inputValue)) {
      const inputNumber = parseFloat(inputValue);
      if (inputNumber >= 0) {
        this.setState({
          inputNumber: inputNumber,
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

  handleAdd(self, event) {
    self.props.addToBalance(self.state.inputNumber);
  }

  handleRemove(self, event) {
    const { balance } = self.props;
    if (balance >= self.state.inputNumber) {
      self.props.removeFromBalance(self.state.inputNumber);
    } else {
      this.setState({
        errorMessage: "You do not have that much balance to remove"
      });
    }
  }

  render() {
    const { balance } = this.props;
    let errorMessageDiv = null;

    if (this.state.errorMessage !== null) {
      errorMessageDiv = (
        <div className="ui error message">
          <div className="header">{this.state.errorMessage}</div>
        </div>
      );
    }

    return (
      <div className="balance">
        <div className="back-home">
          <Link to="/">Back to Home</Link>
        </div>
        <h2 className="header">BALANCE : {balance}</h2>
        <div className="update">
          <div className="number">
            <form className="ui form">
              <div className="field">
                <input
                  type="text"
                  name="money"
                  placeholder="Add/Remove from balance"
                  onChange={this.handleInputChange.bind(this)}
                />
              </div>
            </form>
          </div>

          <div className="add">
            <button
              className="ui primary basic button"
              onClick={e => this.handleAdd(this, e)}
            >
              ADD
            </button>
          </div>

          <div className="remove">
            <button
              className="ui primary basic button"
              onClick={e => this.handleRemove(this, e)}
            >
              REMOVE
            </button>
          </div>
        </div>
        {errorMessageDiv}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToBalance: toBeAdded => {
      dispatch(updateBalanceAdd(toBeAdded));
    },
    removeFromBalance: toBeDeducted => {
      dispatch(updateBalanceDeduct(toBeDeducted));
    }
  };
};

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
