import React from "react";
import Background from "../public/backgroundexperience";
import User from "./user";
import axios from "./axios";

export default class NetworkHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <User />
            </div>
        );
    }
}

// <Background />
