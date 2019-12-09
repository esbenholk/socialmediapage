import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import * as io from "socket.io-client";

const socket = io.connect();
socket.on("hello", data => {
    console.log("data from io connection", data);
    socket.emit("rbay", { message: "good to be in contact" });
});

socket.on("someoneNew", console.log);

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let element = <Welcome />;

if (location.pathname != "/welcome") {
    element = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(element, document.querySelector("main"));
