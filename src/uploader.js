import React from "react";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="uploader">
                <img src={this.props.imageurl} id="uploaderProfilePic" />
                <div id="uploaderfunctionality">
                    <input
                        className="uploaderfunctions"
                        id="file"
                        onChange={e => this.props.handleChange(e)}
                        type="file"
                        name="file"
                        accept="image/*"
                    />
                    <button
                        className="uploaderfunctions"
                        onClick={this.props.upload}
                    >
                        {" "}
                        upload{" "}
                    </button>
                </div>
            </div>
        );
    }
}
