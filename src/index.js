import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import App from "./components/App";
import { getNextGameReducer } from "./reducers/reducers";

ReactDOM.render(
  <Provider
    store={createStore(
      getNextGameReducer,
      applyMiddleware(thunk, createLogger())
    )}
  >
    <App />
  </Provider>,
  document.querySelector("#root")
);
