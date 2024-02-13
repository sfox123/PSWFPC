import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element found");
}

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
  </Provider>
);
