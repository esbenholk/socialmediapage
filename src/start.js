import React from "react";
import ReactDOM from "react-dom";
import Registration from "./registration";
import NetworkHome from "./networkhome";

let element = <Registration />;

if (location.pathname != "/welcome") {
    element = <NetworkHome />;
}

ReactDOM.render(element, document.querySelector("main"));
