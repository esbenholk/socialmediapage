import React from "react";
import axios from "./axios";
import ProfileUpdater from "./profileupdater";

export default class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.toggleProfileUpdate = this.toggleProfileUpdate.bind(this);
        this.setButtonText = this.setButtonText.bind(this);
    }
    componentDidMount() {
        if (this.props.bio) {
            this.setState({ buttonText: "edit" });
        } else {
            this.setState({ buttonText: "Add Bio" });
        }
    }
    setButtonText() {
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
                        profile 🌈🌈🌈{" "}
                    </h1>
                    <div id="userdetails">
                        <li>{this.props.name} </li>
                        <li> @ {this.props.email} </li>
                        <li>
                            {!this.state.profileUpdateIsVisible && (
                                <div>
                                    <p> bio: {this.props.bio}</p>
                                    <button
                                        id="editProfile"
                                        onClick={e =>
                                            this.toggleProfileUpdate(e)
                                        }
                                    >
                                        {this.state.buttonText}
                                    </button>
                                </div>
                            )}
                        </li>
                        {this.state.profileUpdateIsVisible && (
                            <ProfileUpdater
                                toggleProfileUpdate={this.toggleProfileUpdate}
                                updateBio={this.props.updateBio}
                                setButtonText={this.setButtonText}
                            />
                        )}
                    </div>

                    <button id="logout" onClick={e => this.logout(e)}>
                        log out
                    </button>
                </div>
            </div>
        );
    }
}
