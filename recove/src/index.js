import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import "assets/css/material-dashboard-react.css?v=1.2.0";

let content = (<BrowserRouter><App /></BrowserRouter>)

ReactDOM.render(content , document.getElementById("root"));
