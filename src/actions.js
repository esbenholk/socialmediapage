import axios from "./axios";

export async function findFriends() {
    const { data } = await axios.get("/friendlist");
    return {
        type: "actiontype",
        friends: data.friends
    };
}

export async function addFriend(id) {
    await axios.post("/addFriend", { otheruser: id });
    return {
        type: "someotheractiontype"
    };
}
