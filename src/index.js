import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Redux/rootReducer.js";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Redux configuration
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.error(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedState,
  compose(applyMiddleware(thunk))
);

store.subscribe(
  throttle(() => {
    saveToLocalStorage(store.getState());
  }, 1000)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.error))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
