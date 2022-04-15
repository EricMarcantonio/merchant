import React from "react";
import ReactDOM from "react-dom";
// import 'semantic-ui-css/semantic.min.css'
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { container } from "./GlobalContainer";
import { ToastContainer } from "react-toastify";


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<container.Provider>
				<App />
				<ToastContainer />
			</container.Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
);
