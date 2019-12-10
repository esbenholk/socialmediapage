import * as io from "socket.io-client";

import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", information => {
            store.dispatch(chatMessages(information));
        });

        socket.on("chatMessage", newchat => {
            console.log("sockets new message", newchat);
            store.dispatch(chatMessage(newchat));
        });
    }
};
