import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendShipButton(otheruser) {
    const [friendshipStatus, setFriendshipStatus] = useState("");
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        axios
            .get("/checkforfriendship", {
                params: { otherId: otheruser.otheruserid }
            })
            .then(result => {
                setButtonText(result.data.buttonText);
                setFriendshipStatus(result.data.friendshipStatus);
            });
    }, []);

    function buttonEffect(e) {
        if (buttonText === "send friendrequest") {
            console.log("send friend request");
            axios
                .post("/requestfriendship", { otherId: otheruser.otheruserid })
                .then(result => {
                    setButtonText(result.data.buttonText);
                    setFriendshipStatus(result.data.friendshipStatus);
                });
        }
        if (
            buttonText === "cancel friendrequest" ||
            buttonText === "cancel friendship"
        ) {
            axios
                .post("/cancelfriendship", { otherId: otheruser.otheruserid })
                .then(result => {
                    setButtonText(result.data.buttonText);
                    setFriendshipStatus(result.data.friendshipStatus);
                });
        }
        if (buttonText === "accept friendrequest") {
            axios
                .post("/acceptfriendship", { otherId: otheruser.otheruserid })
                .then(result => {
                    setButtonText(result.data.buttonText);
                    setFriendshipStatus(result.data.friendshipStatus);
                });
        }
    }

    return (
        <div id="friendshiphandler">
            <div className="friendshiphandler">
                <p> {friendshipStatus} </p>
            </div>
            <div className="friendshiphandler">
                <button onClick={e => buttonEffect(e)}> {buttonText} </button>
            </div>
        </div>
    );
}
