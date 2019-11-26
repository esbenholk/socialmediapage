import React from "react";
import axios from "axios";

export default class registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/register", {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
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
                console.log("didnt work", err);
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
                <div id="registrationbar">
                    {this.state.error && <div className="error"> OOps!</div>}
                    <form id="registrationform">
                        <input
                            id="firstname"
                            name="firstname"
                            placeholder="firstname"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <input
                            name="lastname"
                            placeholder="lastname"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <input
                            name="email"
                            placeholder="email"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <input
                            name="password"
                            placeholder="password"
                            onChange={e => this.handleChange(e.target)}
                        />
                        <button onClick={e => this.submit(e)}>register</button>
                    </form>
                    <button onClick={e => this.login(e)}>
                        already a user? log in
                    </button>
                </div>
            </div>
        );
    }
}
