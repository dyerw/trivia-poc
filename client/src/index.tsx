import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import reducer, { subscribe } from "./reducers";
import { createLoguxCreator } from "@logux/redux";
import { badge, badgeEn, log } from "@logux/client";
import { badgeStyles } from "@logux/client/badge/styles";

const createStore = createLoguxCreator({
  subprotocol: "1.0.0",
  server: "ws://localhost:31337",
  userId: "fuckoff",
  token: "",
});

const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
badge(store.client, { messages: badgeEn, styles: badgeStyles });
log(store.client);
store.client.start();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
