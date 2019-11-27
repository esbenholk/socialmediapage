import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import NetworkHome from "./networkhome";

let element = <Welcome />;

if (location.pathname != "/welcome") {
    element = <NetworkHome />;
}

ReactDOM.render(element, document.querySelector("main"));
