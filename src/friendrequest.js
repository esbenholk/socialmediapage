import React, { useState, useEffect } from "react";
import axios from "./axios";

export function FriendShipButton(otheruser) {
    const [friendshipStatus, setFriendshipStatus] = useState("");
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        console.log("otheruserId", otheruser);
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
        console.log("button pressed", buttonText);
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
            console.log("cancel friend request");
            axios
                .post("/cancelfriendship", { otherId: otheruser.otheruserid })
                .then(result => {
                    setButtonText(result.data.buttonText);
                    setFriendshipStatus(result.data.friendshipStatus);
                });
        }
        if (buttonText === "accept friendrequest") {
            console.log("accept friend request");
            axios
                .post("/acceptfriendship", { otherId: otheruser.otheruserid })
                .then(result => {
                    setButtonText(result.data.buttonText);
                    setFriendshipStatus(result.data.friendshipStatus);
                });
        }
    }

    return (
        <div>
            <h1> {friendshipStatus} </h1>
            <button onClick={e => buttonEffect(e)}> {buttonText} </button>
        </div>
    );
}
