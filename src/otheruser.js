import React from "react";
import axios from "./axios";
import ThreeDRender from "./backgroundexperience";

export class OtherUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log("otheruser data", this.props.match.params.id);
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
            }
        });
    }
    render() {
        return (
            <div>
                <ThreeDRender imageurl={this.state.otheruserImage} />
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
