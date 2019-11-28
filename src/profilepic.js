import React from "react";

export function ProfilePic({ imageurl, toggleUpload }) {
    imageurl =
        imageurl ||
        "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg";

    return (
        <div>
            <img src={imageurl} id="profilepic" onClick={toggleUpload} />
        </div>
    );
}
