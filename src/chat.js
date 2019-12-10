import React, { useEffect, useRef } from "react";

import { socket } from "./sockets";

import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => state && state.chatmessages);
    console.log("chatmessages", chatmessages);

    const messagesDiv = useRef();
    useEffect(() => {
        console.log(messagesDiv);
        messagesDiv.current.scrollTop =
            messagesDiv.current.scrollHeight - messagesDiv.current.clientHeight;
    }, []);

    function keycheck(e) {
        if (e.key == "Enter") {
            console.log(e.target.value);
            socket.emit("wroteChatMessage", { message: e.target.value });
            e.target.value = "";
        }
    }
    return (
        <div className="chat">
            <h1> CHAT </h1>
            <div className="messages" ref={messagesDiv}></div>
            {chatmessages.map(chatmessage => ()
            <textarea
                placeholder="write in the shared chat"
                onKeyUp={e => keycheck(e)}
            ></textarea>
        </div>
    );
}
