import React from "react";

export function ProfilePic({
    imageurl,
    toggleUpload,
    history,
    changeCubeImage
}) {
    imageurl =
        imageurl ||
        "https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg";
    function onClick() {
        toggleUpload();
        changeCubeImage(imageurl);
        history.push("/");
        document.getElementById("profilepic").classList.remove("on");
        if (document.getElementById("userprofile").classList.contains("on")) {
            document.getElementById("userprofile").classList.remove("on");
        }
        if (
            document.getElementById("otherUsersList").classList.contains("on")
        ) {
            document.getElementById("otherUsersList").classList.remove("on");
        }
    }
    return (
        <div>
            <img src={imageurl} id="profilepic" onClick={onClick} />
        </div>
    );
}
