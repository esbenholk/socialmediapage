import React from "react";
import axios from "./axios";
import ProfileUpdater from "./profileupdater";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("props passed to user component", this);
        this.toggleProfileUpdate = this.toggleProfileUpdate.bind(this);
    }
    componentDidMount() {
        if (this.props.bio) {
            this.setState({ buttonText: "edit" });
        } else {
            this.setState({ buttonText: "Add Bio" });
        }
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
    toggleProfileUpdate() {
        this.setState({
            profileUpdateIsVisible: !this.state.profileUpdateIsVisible
        });
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
                        <li> {this.props.bio} </li>
                    </div>

                    <button
                        id="editProfile"
                        onClick={e => this.toggleProfileUpdate(e)}
                    >
                        {this.state.buttonText}
                    </button>
                    <button id="logout" onClick={e => this.logout(e)}>
                        log out
                    </button>
                    {this.state.profileUpdateIsVisible && (
                        <ProfileUpdater
                            toggleProfileUpdate={this.toggleProfileUpdate}
                            updateBio={this.props.updateBio}
                        />
                    )}
                </div>
            </div>
        );
    }
}
