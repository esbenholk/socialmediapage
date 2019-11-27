import React from "react";
import axios from "./axios";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                </div>
            </div>
        );
    }
}
