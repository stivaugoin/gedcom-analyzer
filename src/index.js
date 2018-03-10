/* eslint-disable react/jsx-filename-extension */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./reducers";

const initialState = {};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-disable */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
