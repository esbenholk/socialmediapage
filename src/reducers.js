////////if first passed argment is undefined, it replaces it with right assignement (in this case empty object)

export default function(state = {}, action) {
    if (action.type == "get_friends_and_requests") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "add_friend_to_friendlist") {
        state = {
            ...state,
            friends: state.friends.map(person => {
                if (person.id == action.newfriend) {
                    person.accepted = true;
                    return person;
                } else {
                    return person;
                }
            })
        };
    }
    if (action.type == "delete_friend") {
        state = {
            ...state,
            friends: state.friends.filter(
                person => person.id != action.killfriend
            )
        };
    }

    if (action.type == "latest_chatmessages") {
        state = {
            ...state,
            messages: action.messages
        };
    }
    if (action.type == "new_chatmessage") {
        console.log("");
        console.log("this is the added chat", action.messages);

        state = {
            ...state,
            messages: state.messages.concat(action.messages.message)
        };
    }

    return state;
}
