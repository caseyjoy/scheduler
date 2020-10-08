import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application.jsx";

// ReactDOM.render(<Application />, document.getElementById("root"));
ReactDOM.render(<Application app={<Application />}/>, document.getElementById("root"));
