import React from "react";
import axios from "./axios";

export class OtherUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("otheruser data", this);
        axios.get(`/otheruser/${this.props.match.params.id}`).then(results => {
            if (
                this.props.match.params.id == results.data.userId ||
                results.data.success == false
            ) {
                this.props.history.push("/");
            } else if (results.data.success) {
                this.setState({
                    otheruserName: results.data.otheruserName,
                    otheruserImage: results.data.otheruserImage,
                    otheruserbio: results.data.otheruserbio
                });
                console.log(
                    "what are the props given to otheruser",
                    this.props
                );
                this.props.changeCubeImage(this.state.otheruserImage);
            }
        });
    }
    render() {
        return (
            <div>
                <div className="focusSquareGreen">
                    <div id="line2otheruserDetails"> </div>
                    <div id="otheruserDetails">
                        <li> {this.state.otheruserName} </li>
                        <li> bio: {this.state.otheruserbio} </li>
                    </div>
                </div>
            </div>
        );
    }
}
