import React from "react";
import App from "./App";
import configureStore from "../store";
import { Provider } from "react-redux";

class Master extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App />
      </Provider>
    );
  }
}

export default Master;
