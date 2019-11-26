var spicedPg = require("spiced-pg");
var database = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialmediaplatform"
);

module.exports.register = function(firstname, lastname, email, hashedPassword) {
    return database.query(
        `INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id`,
        [firstname, lastname, email, hashedPassword]
    );
};
