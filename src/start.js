import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { reducer } from "./reducers";
const store = createStore(reducer, applyMiddleware(reduxPromise));

let element = <Welcome />;

if (location.pathname != "/welcome") {
    // element = (<Provider store={store}>
    //     <App />
    // </Provider>);
    element = <App />;
}

ReactDOM.render(element, document.querySelector("main"));
