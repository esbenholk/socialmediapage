import React from "react";
import axios from "./axios";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.getUserDetails();
    }
    openAccountMenu() {
        if (document.getElementById("userprofile").classList.contains("on")) {
            document.getElementById("userprofile").classList.remove("on");
        } else {
            document.getElementById("userprofile").classList.add("on");
        }
    }
    getUserDetails() {
        axios
            .get("/user")
            .then(userDetails => {
                this.setState({
                    name: userDetails.data.name,
                    email: userDetails.data.email,
                    image: userDetails.data.image
                });
                console.log("state from user js", this.state);
            })
            .catch(err => {
                console.log("didnt get user dewtails");
            });
    }
    logout() {
        axios
            .post("/logout")
            .then(({ data }) => {
                location.replace("/");
            })
            .catch("unable to log out");
    }
    render() {
        return (
            <div>
                <div id="userprofile">
                    <h1
                        id="accountMenuTrigger"
                        onClick={e => this.openAccountMenu(e)}
                    >
                        {" "}
                        account details{" "}
                    </h1>
                    <p>{this.state.name}</p>
                    <p>{this.state.email}</p>
                    <img src={this.state.image} />
                    <button id="logout" onClick={e => this.logout(e)}>
                        log out
                    </button>
                </div>
            </div>
        );
    }
}
