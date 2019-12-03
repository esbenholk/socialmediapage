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

    console.log("textfieldValue", textfieldValue);

    return (
        <div id="otherUsersList">
            <div>
                <h1> check out some new users</h1>
                {users.map(user => (
                    <li key={user.id}>
                        {user.firstname}
                        <img src={user.imageurl} id="thumbnailpic" />
                    </li>
                ))}
            </div>
            <div>
                <h1>search for your friends</h1>
                <input onChange={e => setTextfieldValue(e.target.value)} />
            </div>
        </div>
    );
}
