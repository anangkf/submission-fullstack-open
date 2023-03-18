/* eslint-disable react/jsx-filename-extension */
import React from "react";
import ReactDOM from "react-dom/client";
import {Provider} from 'react-redux'
import DefaultRoutes from "./routes";
import store from "./store";
import './styles/index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <DefaultRoutes />
  </Provider>
);
