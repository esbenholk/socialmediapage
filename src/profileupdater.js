import React from "react";
import axios from "./axios";

export default class ProfileUpdater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateBio = this.updateBio.bind(this);
    }
    updateBio() {
        axios
            .post("/updateBio", {
                bio: this.state.bio
            })
            .then(userdetails => {
                this.props.updateBio(userdetails.data.bio);
                this.props.toggleProfileUpdate();
                this.props.setButtonText();
            });
    }
    handleChange(inputElement) {
        this.setState({
            [inputElement.name]: inputElement.value
        });
    }
    render() {
        return (
            <div id="profileUpdater">
                <textarea
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="click here to edit your bio"
                    onChange={e => this.handleChange(e.target)}
                />
                <button onClick={this.updateBio}> save </button>
            </div>
        );
    }
}
