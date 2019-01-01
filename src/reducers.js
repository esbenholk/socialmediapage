////////if first passed argment is undefined, it replaces it with right assignement (in this case empty object)
export default function(state = {}, action) {
    console.log("state in reducer:", state);
    if (action.type == "actiontype") {
        state = {
            ...state,
            friends: action.friends
        };
    }
    if (action.type == "someotheractiontype") {
        state = {
            ...state,
            users: state.users.map(user => {
                if (user.id == action.id) {
                    return {
                        ...user,
                        friend: true
                    };
                } else {
                    return user;
                }
            })
        };
    }
    return state;
}
