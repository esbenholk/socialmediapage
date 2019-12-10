var spicedPg = require("spiced-pg");
var database = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialmediaplatform"
);

/////registration insert
module.exports.register = function(firstname, lastname, email, hashedPassword) {
    return database.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstname, lastname, email, hashedPassword]
    );
};

/////getting details from assorted identifiers
module.exports.getUserDetailsFromEmail = function(email) {
    return database.query(`SELECT * FROM users WHERE email=$1`, [email]);
};
module.exports.getUserDetailsFromId = function(id) {
    return database.query(`SELECT * FROM users WHERE id=$1`, [id]);
};
module.exports.getUserDetailsFromIncSearch = function(textinput) {
    return database.query(
        `SELECT firstname, lastname, id, imageUrl FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1 LIMIT 3`,
        [textinput + "%"]
    );
};

/////update/upload
module.exports.uploadProfilePic = function(imageURL, id) {
    return database.query(
        `UPDATE users SET imageUrl=$1 WHERE id=$2 RETURNING *`,
        [imageURL, id]
    );
};
module.exports.updateBio = function(bio, id) {
    return database.query(`UPDATE users SET bio=$1 WHERE id=$2 RETURNING *`, [
        bio,
        id
    ]);
};

///FriendRequest
module.exports.checkingFriendshipStatus = function(receiver_id, sender_id) {
    return database.query(
        `SELECT * FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};
module.exports.sendFriendRequest = function(receiver_id, sender_id) {
    return database.query(
        `INSERT INTO friendships (receiver_id, sender_id) VALUES ($1, $2) RETURNING *`,
        [receiver_id, sender_id]
    );
};
module.exports.cancelFriendship = function(receiver_id, sender_id) {
    return database.query(
        `DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};
module.exports.acceptFriendship = function(receiver_id, sender_id) {
    return database.query(
        `UPDATE friendships SET accepted=true WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1)`,
        [receiver_id, sender_id]
    );
};

////friendList
module.exports.getFriendList = function(userId) {
    return database.query(
        `SELECT users.id, firstname, lastname, imageUrl, accepted
          FROM friendships
          JOIN users
          ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
          OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
          OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)`,
        [userId]
    );
};

//chat
module.exports.getMessages = function() {
    return database.query(
        `SELECT * FROM chatmessages JOIN users ON (users.id = chatmessages.comment_id) ORDER BY chatmessages.chatid DESC LIMIT 10`
    );
};

module.exports.storeMessages = function(msg, commentId) {
    return database.query(
        `INSERT INTO chatmessages (comment_id, chatmessages) VALUES ($2, $1) RETURNING *`,
        [msg, commentId]
    );
};
