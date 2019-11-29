var spicedPg = require("spiced-pg");
var database = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialmediaplatform"
);

module.exports.register = function(firstname, lastname, email, hashedPassword) {
    return database.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
        [firstname, lastname, email, hashedPassword]
    );
};

module.exports.getUserDetailsFromEmail = function(email) {
    return database.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

module.exports.getUserDetailsFromId = function(id) {
    return database.query(`SELECT * FROM users WHERE id=$1`, [id]);
};

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
