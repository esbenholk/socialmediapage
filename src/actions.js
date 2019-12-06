import axios from "./axios";

export async function findFriends() {
    const { data } = await axios.get("/friendlist");
    return {
        type: "get_friends_and_requests",
        friends: data.friends_unsorted
    };
}

export async function addFriend(otheruser) {
    await axios.post("/acceptfriendship", {
        otherId: otheruser
    });
    console.log("actions.addfriend", otheruser);
    return {
        type: "add_friend_to_friendlist",
        newfriend: otheruser
    };
}

export async function removeFriend(otheruser) {
    await axios.post("/cancelfriendship", {
        otherId: otheruser
    });
    return {
        type: "delete_friend",
        killfriend: otheruser
    };
}
