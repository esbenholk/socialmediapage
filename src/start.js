import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";

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
