import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { container } from "./GlobalContainer";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <container.Provider>
        <App />
        <ToastContainer />
      </container.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
