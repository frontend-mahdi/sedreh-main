import React from "react";
import ReactDOM from "react-dom";
import "./app.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// import App from "./playground";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  rootElement
);
