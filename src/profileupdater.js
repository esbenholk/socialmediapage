import React from "react";
import axios from "./axios";

export default class ProfileUpdater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="profileUpdater">
                <h1> update profile </h1>
                <input
                    id="file"
                    onChange={e => this.props.handleChange(e)}
                    type="file"
                    name="file"
                    accept="image/*"
                />
                <button onClick={this.props.upload}> upload </button>
            </div>
        );
    }
}
