import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

let element = <Welcome />;

if (location.pathname != "/welcome") {
    element = <App />;
}

ReactDOM.render(element, document.querySelector("main"));
