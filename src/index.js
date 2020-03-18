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

// rodos, cia per anksti saukia getResultApiAction (result taip is API taip ir rodo null (nors jis gaunamas)). GET_RESULT Action ipushina viena sena objekta i array.
