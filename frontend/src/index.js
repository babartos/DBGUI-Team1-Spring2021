import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { App } from "./pages/app";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement)
