import React from "react";
import User from "./user";
import axios from "./axios";
import { ProfilePic } from "./profilepic";
import Uploader from "./uploader";
import ThreeDRender from "./backgroundexperience";
import { BrowserRouter, Route } from "react-router-dom";
import { OtherUser } from "./otheruser";
import { OtherUsersList } from "./otherusers";

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
        this.changeCubeImage = this.changeCubeImage.bind(this);
    }
    componentDidMount() {
        this.getUserDetails();
    }
    getUserDetails() {
        axios
            .get("/user.json")
            .then(userDetails => {
                console.log("fetching bio", userDetails.data.bio);
                this.setState({
                    name: userDetails.data.name,
                    email: userDetails.data.email,
                    image: userDetails.data.image,
                    bio: userDetails.data.bio,
                    cubeImage: userDetails.data.image
                });
            })
            .catch(() => {
                console.log("didnt get user details");
            });
    }
    toggleUpload() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible
        });
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
                    this.setState({
                        image: data.image,
                        uploaderIsVisible: !this.state.uploaderIsVisible
                    });
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
    changeCubeImage(image) {
        this.setState({ cubeImage: image });
    }

    render() {
        if (!this.state.name) {
            return null;
        } else {
            return (
                <div>
                    <BrowserRouter>
                        <div>
                            <Route
                                render={props => (
                                    <ProfilePic
                                        imageurl={this.state.image}
                                        toggleUpload={this.toggleUpload}
                                        history={props.history}
                                        changeCubeImage={this.changeCubeImage}
                                    />
                                )}
                            />

                            <ThreeDRender imageurl={this.state.cubeImage} />

                            <Route
                                path="/user/:id"
                                render={props => (
                                    <OtherUser
                                        history={props.history}
                                        match={props.match}
                                        changeCubeImage={this.changeCubeImage}
                                    />
                                )}
                            />

                            <OtherUsersList />

                            <User
                                name={this.state.name}
                                email={this.state.email}
                                bio={this.state.bio}
                                toggleProfileUpdate={this.toggleProfileUpdate}
                                updateBio={this.updateBio}
                            />

                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    imageurl={this.state.image}
                                    upload={this.upload}
                                    handleChange={this.handleChange}
                                    toggleUpload={this.toggleUpload}
                                />
                            )}
                        </div>
                    </BrowserRouter>
                </div>
            );
        }
    }
}

// <Background />
