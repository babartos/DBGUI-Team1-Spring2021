import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import Home from "./pages/home"
import { Login } from "./pages/login";

const rootElement = document.getElementById("root");
ReactDOM.render(<Home />, rootElement)