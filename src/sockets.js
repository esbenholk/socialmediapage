import * as io from "socket.io-client";

import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", information => {
            store.dispatch(chatMessages(information));
            console.log("have the entire array of messages", information);
        });

        socket.on("chatMessage", newchat => {
            store.dispatch(chatMessage(newchat));
            console.log(
                "updated chat messaages received on front end",
                newchat
            );
        });
    }
};
