import React, { useEffect, useRef } from "react";

import { socket } from "./sockets";

import { useSelector } from "react-redux";

export function Chat() {
    const chatMessages = useSelector(state => {
        return state && state.messages;
    });

    const messagesDiv = useRef();
    useEffect(() => {
        if (chatMessages) {
            messagesDiv.current.scrollTop =
                messagesDiv.current.scrollHeight -
                messagesDiv.current.clientHeight;
        }
    }, [chatMessages]);

    function keycheck(e) {
        if (e.key == "Enter") {
            console.log(e.target.value);
            socket.emit("wroteChatMessage", { message: e.target.value });
            e.target.value = "";
        }
    }
    if (!chatMessages) {
        return null;
    }
    return (
        <div className="chat">
            <div className="messages" ref={messagesDiv}>
                {chatMessages.map(chatmessage => (
                    <div key={chatmessage.chatid} id="singlemessages">
                        {" "}
                        <img src={chatmessage.imageurl} id="chatimage" />
                        <div>
                            <p id="chatname">
                                {" "}
                                {chatmessage.firstname} {chatmessage.lastname}{" "}
                            </p>{" "}
                            <p> {chatmessage.chatmessages} </p>{" "}
                        </div>
                    </div>
                ))}
                <textarea
                    id="chatinput"
                    placeholder="write in the shared chat"
                    onKeyUp={e => keycheck(e)}
                ></textarea>
            </div>
        </div>
    );
}
