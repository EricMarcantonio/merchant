import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { container } from "./GlobalContainer";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <container.Provider>
        <App />
      </container.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
