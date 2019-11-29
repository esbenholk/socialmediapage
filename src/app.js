import React from "react";
import User from "./user";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";
import ThreeDRender from "./backgroundexperience";

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
        this.updateBio = this.updateBio.bind(this);
    }
    componentDidMount() {
        this.getUserDetails();
    }
    getUserDetails() {
        axios
            .get("/user")
            .then(userDetails => {
                console.log("fetching bio", userDetails.data.bio);
                this.setState({
                    name: userDetails.data.name,
                    email: userDetails.data.email,
                    image: userDetails.data.image,
                    bio: userDetails.data.bio
                });
            })
            .catch(() => {
                console.log("didnt get user details");
            });
    }
    toggleUpload() {
        this.setState({ uploaderIsVisible: !this.state.uploaderIsVisible });
    }
    handleChange(e) {
        console.log("file", e.target.files[0]);
        this.setState({ file: e.target.files[0] });
    }
    updateBio(newBio) {
        this.setState({ bio: newBio });
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
        console.log(this.state);
        return (
            <div>
                {this.state.name && (
                    <User
                        name={this.state.name}
                        email={this.state.email}
                        bio={this.state.bio}
                        toggleProfileUpdate={this.toggleProfileUpdate}
                        updateBio={this.updateBio}
                    />
                )}
                <ProfilePic
                    imageurl={this.state.image}
                    toggleUpload={this.toggleUpload}
                />
                <ThreeDRender imageurl={this.state.image} />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        imageurl={this.state.image}
                        upload={this.upload}
                        handleChange={this.handleChange}
                    />
                )}
            </div>
        );
    }
}

// <Background />
