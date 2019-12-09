import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export function OtherUsersList() {
    const [textfieldValue, setTextfieldValue] = useState(null);
    const [users, setUsers] = useState(null);

    function getUserList() {
        let cancel = false;

        axios
            .get("/otheruserslist", { params: { input: textfieldValue } })
            .then(results => {
                if (!cancel) {
                    setUsers(results.data.users);
                }
                return (cancel = true);
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        getUserList();
    }, [textfieldValue]);

    if (!users) {
        return null;
    }

    function openOtherUsers() {
        if (
            document.getElementById("otherUsersList").classList.contains("on")
        ) {
            document.getElementById("otherUsersList").classList.remove("on");
            document.getElementById("profilepic").classList.remove("on");
        } else {
            document.getElementById("otherUsersList").classList.add("on");
            getUserList();
        }
    }

    return (
        <div id="otherUsersList">
            <h1 id="otherUsersTrigger" onClick={e => openOtherUsers(e)}>
                {" "}
                other users 🔥🔥🔥{" "}
            </h1>

            <li> check out some new users or search for your friends </li>

            <input onChange={e => setTextfieldValue(e.target.value)} />

            {users.map(user => (
                <div key={user.id} onClick={e => openOtherUsers(e)}>
                    <Link to={`/user/${user.id}`}>
                        <li id="otherUsersListscroll">
                            <div id="otherUsersListSingleItem">
                                <img src={user.imageurl} id="thumbnailpic" />
                                <div id="line2otherUserListLi"> </div>
                                <p>
                                    {" "}
                                    {user.firstname} {user.lastname}{" "}
                                </p>
                            </div>
                        </li>
                    </Link>
                </div>
            ))}
        </div>
    );
}
