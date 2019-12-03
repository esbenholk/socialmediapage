import React, { useState, useEffect } from "react";
import axios from "./axios";

export function OtherUsersList() {
    console.log("other users list component");
    const [textfieldValue, setTextfieldValue] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        let cancel = false;
        (async () => {
            axios
                .get("/otheruserslist", { params: { input: textfieldValue } })
                .then(results => {
                    console.log(
                        "results from axios in otherusers",
                        results.data
                    );
                    if (!cancel) {
                        setUsers(results.data.users);
                    }
                });

            console.log("users", users);
        })();
        return () => {
            cancel = true;
        };
    }, [textfieldValue]);

    if (!users) {
        return null;
    }

    function openAccountMenu() {
        if (
            document.getElementById("otherUsersList").classList.contains("on")
        ) {
            document.getElementById("otherUsersList").classList.remove("on");
            document.getElementById("profilepic").classList.remove("on");
        } else {
            document.getElementById("otherUsersList").classList.add("on");
            document.getElementById("otherUsersList").classList.add("on");
        }
    }

    return (
        <div id="otherUsersList">
            <h1 id="otherUsersTrigger" onClick={e => openAccountMenu(e)}>
                {" "}
                find users{" "}
            </h1>

            <li> check out some new users or search for your friends </li>

            <input onChange={e => setTextfieldValue(e.target.value)} />

            {users.map(user => (
                <li key={user.id}>
                    <a id="otherUsersListSingleItem" href={`/user/${user.id}`}>
                        <img src={user.imageurl} id="thumbnailpic" />
                        <div id="line2otherUserListLi"> </div>
                        <p>
                            {" "}
                            {user.firstname} {user.lastname}{" "}
                        </p>
                    </a>
                </li>
            ))}
        </div>
    );
}
