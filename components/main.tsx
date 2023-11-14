import React from "react";
import ReactDOM from "react-dom/client";

import store from "../store";
import { Provider } from "react-redux";
import Root from "../routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
);
