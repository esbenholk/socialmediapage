import React from "react";
import Background from "../public/backgroundexperience";
import User from "./user";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";
import ProfileUpdater from "./profileupdater";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            profileUpdateIsVisible: false
        };
        this.toggleUpload = this.toggleUpload.bind(this);
        this.upload = this.upload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggleProfileUpdate = this.toggleProfileUpdate.bind(this);
    }
    componentDidMount() {
        this.getUserDetails();
    }
    getUserDetails() {
        axios
            .get("/user")
            .then(userDetails => {
                this.setState({
                    name: userDetails.data.name,
                    email: userDetails.data.email,
                    image: userDetails.data.image,
                    bio: userDetails.data.bio
                });
            })
            .catch(err => {
                console.log("didnt get user dewtails");
            });
    }
    toggleUpload() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }
    toggleProfileUpdate() {
        this.setState({
            profileUpdateIsVisible: !this.state.profileUpdateIsVisible
        });
    }
    handleChange(e) {
        console.log("file", e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    }
    upload() {
        var fd = new FormData();
        fd.append("file", this.state.file);
        axios
            .post("/upload", fd)
            .then(({ data }) => {
                if (data.success) {
                    console.log("data", data);
                    this.setState({ image: data.image });
                } else {
                    this.setState({
                        error: true
                    });
                }
            })
            .catch(err => {
                console.log("upload image didnt work", err);
                this.setState({
                    error: true
                });
            });
    }
    render() {
        return (
            <div>
                <User
                    name={this.state.name}
                    email={this.state.email}
                    bio={this.state.bio}
                    toggleProfileUpdate={this.toggleProfileUpdate}
                />
                <ProfilePic
                    imageurl={this.state.image}
                    toggleUpload={this.toggleUpload}
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        upload={this.upload}
                        handleChange={this.handleChange}
                    />
                )}
                {this.state.profileUpdateIsVisible && <ProfileUpdater />}
            </div>
        );
    }
}

// <h1 onClick={this.toggleUpload}> upload image </h1>

// <Background />
