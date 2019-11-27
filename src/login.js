import React from "react";
import { Link } from "react-router-dom";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    login(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("didnt loing", err);
                this.setState({
                    error: true
                });
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    render() {
        return (
            <div>
                <div className="registrationloginbar">
                    {this.state.error && <div className="error"> OOps!</div>}
                    <div className="registrationlogin">
                        <input
                            name="email"
                            placeholder="email"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="password"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <button onClick={e => this.login(e)}>log in</button>
                        <Link to="/" className="loginswitchregistration">
                            not a user yet? register
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

// <button onClick={e => this.submit(e)}>login</button>
