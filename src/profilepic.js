import React from "react";

export function ProfilePic({ imageurl, toggleUpload, history }) {
    console.log(history);

    imageurl =
        imageurl ||
        "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg";
    function onClick() {
        console.log("trying to get profie pic to do two things");

        toggleUpload();

        history.push("/");
    }
    return (
        <div>
            <img src={imageurl} id="profilepic" onClick={onClick} />
        </div>
    );
}
