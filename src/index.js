import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/styles.css";
import App from "./components/App";

/**
 * DEPENDENCIES:
 * npm i react
 * npm i parcel-bundler
 *
 */

const root = ReactDOM.createRoot(document.getElementById("root"));
/* Run the main component/function */
root.render(
  //   <React.StrictMode>
  <App />
  //   </React.StrictMode>
);
