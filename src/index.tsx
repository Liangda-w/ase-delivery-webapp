import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "./assets/css/index.css";
import { Provider } from "react-redux";
import { App } from "./app/App";

import { store } from "./app/state";
// UI
import { UiLibProvider } from "./assets/provider/Povider";

ReactDOM.render(
  <React.StrictMode>
    <ReactNotification />
    <Provider store={store}>
      <BrowserRouter>
        <UiLibProvider>
          <App />
        </UiLibProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
