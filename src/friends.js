import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findFriends, addFriend, removeFriend } from "./actions";
import { Link } from "react-router-dom";

export function FriendList() {
    const dispatch = useDispatch();
    const friends = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(person => person.accepted == true)
        );
    });
    const request = useSelector(state => {
        return (
            state.friends &&
            state.friends.filter(person => person.accepted == false)
        );
    });

    useEffect(() => {
        dispatch(findFriends());
    }, []);

    if (!friends) {
        return null;
    }
    function openFriends() {
        if (document.getElementById("friendlist").classList.contains("on")) {
            document.getElementById("friendlist").classList.remove("on");
            document.getElementById("friendlist").classList.remove("on");
        } else {
            document.getElementById("friendlist").classList.add("on");
        }
    }
    function unfriend(otheruser) {
        console.log("unfriend number:", otheruser);
        dispatch(removeFriend(otheruser));
    }
    function befriend(otheruser) {
        console.log("befriend number:", otheruser);
        dispatch(addFriend(otheruser));
    }

    return (
        <div id="friendlist">
            <h1 id="friendlistTrigger" onClick={e => openFriends(e)}>
                {" "}
                friends 😍😍😍{" "}
            </h1>
            <h1>friends </h1>
            <div id="friends" className="peoplecontainer">
                {friends.map(friend => (
                    <li key={friend.id} className="friendlistElement">
                        <Link to={`/user/${friend.id}`}>
                            <img src={friend.imageurl} />{" "}
                        </Link>
                        {friend.firstname} {friend.lastname}
                        <button onClick={() => unfriend(friend.id)}>
                            {" "}
                            unfriend{" "}
                        </button>
                    </li>
                ))}
            </div>
            <h1>people who want to be your friend </h1>
            <div id="requests" className="peoplecontainer">
                {request.map(wannabe => (
                    <li key={wannabe.id} className="friendlistElement">
                        <Link to={`/user/:${wannabe.id}`}>
                            <img src={wannabe.imageurl} />{" "}
                        </Link>
                        {wannabe.firstname} {wannabe.lastname} {wannabe.id}
                        <button onClick={e => befriend(wannabe.id)}>
                            {" "}
                            befriend{" "}
                        </button>
                        <button onClick={e => unfriend(wannabe.id)}>
                            {" "}
                            delete request{" "}
                        </button>
                    </li>
                ))}
            </div>
        </div>
    );
}
//
