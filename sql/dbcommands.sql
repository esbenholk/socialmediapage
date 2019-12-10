DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS chatmessages;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(300) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    imageUrl VARCHAR(255),
    bio VARCHAR,
    friendrequests integer[],
    friends integer[]
);


CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id),
    sender_id INT NOT NULL REFERENCES users(id),
    accepted BOOLEAN DEFAULT FALSE
);

CREATE TABLE chatmessages(
    id SERIAL PRIMARY KEY,
    comment_id INT NOT NULL REFERENCES users(id),
    chatmessages VARCHAR NOT NULL
)
