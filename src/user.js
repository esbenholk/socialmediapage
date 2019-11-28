import React from "react";
import axios from "./axios";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("props passed to user component", this);
    }
    openAccountMenu() {
        if (document.getElementById("userprofile").classList.contains("on")) {
            document.getElementById("userprofile").classList.remove("on");
            document.getElementById("profilepic").classList.remove("on");
        } else {
            document.getElementById("userprofile").classList.add("on");
            document.getElementById("profilepic").classList.add("on");
        }
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
                    <div id="userdetails">
                        <li>{this.props.name} </li>
                        <li> @ {this.props.email} </li>
                        <li> bio: {this.props.bio} </li>
                    </div>
                    <button
                        id="editProfile"
                        onClick={e => this.props.toggleProfileUpdate(e)}
                    >
                        edit profile
                    </button>
                    <button id="logout" onClick={e => this.logout(e)}>
                        log out
                    </button>
                </div>
            </div>
        );
    }
}
