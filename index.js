const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, { origins: "localhost:8080" });
const compression = require("compression");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bcrypt");
const databaseActions = require("./utils/db");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

app.use(express.static("./public"));
app.use(express.static("./utils"));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

////middleware, csurf, multer(file-uploading)
const cookieSessionMiddleware = cookieSession({
    secret: `jenniferAnistonisnot the code`,
    maxAge: 1000 * 60 * 60 * 24 * 90
});

app.use(cookieSessionMiddleware);
io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("customCSURFtoken", req.csrfToken());
    next();
});

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

///login
app.post("/register", (req, res) => {
    hash(req.body.password).then(hashedPassword => {
        databaseActions
            .register(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPassword
            )
            .then(result => {
                req.session.userId = result.rows[0].id;
                res.json({
                    success: true,
                    name:
                        result.rows[0].firstname + " " + result.rows[0].lastname
                });
            })
            .catch(() => {
                res.json({
                    error: true
                });
            });
    });
});
app.post("/login", (req, res) => {
    databaseActions
        .getUserDetailsFromEmail(req.body.email)
        .then(userDetails => {
            compare(req.body.password, userDetails.rows[0].password)
                .then(match => {
                    if (match == true) {
                        req.session.userId = userDetails.rows[0].id;
                        res.json({
                            success: true,
                            name:
                                userDetails.rows[0].firstname +
                                userDetails.rows[0].lastname,
                            email: userDetails.rows[0].email
                        });
                    }
                })
                .catch(err => console.log("fail in compare"));
        });
});
app.post("/logout", (req, res) => {
    req.session = null;
    res.json({ logout: true });
});
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imageURL = `${s3Url}/${req.file.filename}`;
    databaseActions
        .uploadProfilePic(imageURL, req.session.userId)
        .then(results => {
            res.json({
                success: true,
                image: results.rows[0].imageurl
            });
        })
        .catch("imageurl not uploaded to database");
});
app.post("/updatebio", (req, res) => {
    databaseActions
        .updateBio(req.body.bio, req.session.userId)
        .then(results => {
            res.json({
                success: true,
                name: results.rows[0].firstname + results.rows[0].lastname,
                email: results.rows[0].email,
                bio: results.rows[0].bio
            });
        });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("/otheruser/:id", (req, res) => {
    databaseActions
        .getUserDetailsFromId(req.params.id)
        .then(results => {
            if (results.rowCount == 0) {
                res.json({ success: false });
            } else {
                res.json({
                    success: true,
                    otheruserName:
                        results.rows[0].firstname +
                        " " +
                        results.rows[0].lastname,
                    otheruserImage: results.rows[0].imageurl,
                    otheruserbio: results.rows[0].bio,
                    userId: req.session.userId
                });
            }
        })
        .catch(err => console.log(err));
});
app.get("/user.json", (req, res) => {
    databaseActions
        .getUserDetailsFromId(req.session.userId)
        .then(results => {
            res.json({
                success: true,
                name:
                    results.rows[0].firstname + " " + results.rows[0].firstname,
                email: results.rows[0].email,
                image: results.rows[0].imageurl,
                bio: results.rows[0].bio
            });
        })
        .catch(() => console.log("no results from user route"));
});
app.get("/otheruserslist", (req, res) => {
    if (!req.query.input) {
        databaseActions
            .getUserDetailsFromIncSearch("")
            .then(results => {
                res.json({
                    users: results.rows
                });
            })
            .catch(err => console.log("didnt get list of users", err));
    } else {
        databaseActions
            .getUserDetailsFromIncSearch(req.query.input)
            .then(results => {
                res.json({
                    users: results.rows
                });
            })
            .catch(err => console.log("didnt get list of users", err));
    }
});

app.get("/friendlist", (req, res) => {
    databaseActions
        .getFriendList(req.session.userId)
        .then(result => {
            res.json({ friends_unsorted: result.rows });
        })
        .catch(err => console.log("wrong friendlist query", err));
});
app.get("/checkforfriendship", (req, res) => {
    databaseActions
        .checkingFriendshipStatus(req.query.otherId, req.session.userId)
        .then(result => {
            if (result.rowCount === 0) {
                res.json({
                    buttonText: "send friendrequest",
                    friendshipStatus: ""
                });
            }
            if (result.rowCount > 0) {
                if (result.rows[0].accepted === true) {
                    res.json({
                        buttonText: "cancel friendship",
                        friendshipStatus: "friends"
                    });
                } else if (result.rows[0].accepted === false) {
                    if (result.rows[0].receiver_id === req.session.userId) {
                        res.json({
                            buttonText: "accept friendrequest",
                            friendshipStatus: "they wanna be friends with u!"
                        });
                    } else if (
                        result.rows[0].sender_id === req.session.userId
                    ) {
                        res.json({
                            buttonText: "cancel friendrequest",
                            friendshipStatus:
                                "u asked them for friendship and they havent answered yet"
                        });
                    }
                }
            }
        })
        .catch(err => console.log("not doing sql correctly", err));
});
app.post("/requestfriendship", (req, res) => {
    databaseActions
        .sendFriendRequest(req.body.otherId, req.session.userId)
        .then(result => {
            console.log("friendshiprequest sent");
            res.json({
                buttonText: "cancel friendrequest",
                friendshipStatus:
                    "u asked them for friendship and they havent answered yet"
            });
        })
        .catch(console.log("handling error in sending friendrequest"));
});
app.post("/cancelfriendship", (req, res) => {
    databaseActions
        .cancelFriendship(req.body.otherId, req.session.userId)
        .then(result => {
            console.log("deleted friend/request");
            res.json({
                buttonText: "send friendrequest",
                friendshipStatus: "not friends"
            });
        })
        .catch(err => {
            console.log("handling error in cancelling friendship");
        });
});
app.post("/acceptfriendship", (req, res) => {
    databaseActions
        .acceptFriendship(req.body.otherId, req.session.userId)
        .then(() => {
            console.log("friend added");
            res.json({
                buttonText: "cancel friendship",
                friendshipStatus: "friends"
            });
        })
        .catch(console.log("handling error in accept friendrequest"));
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, function() {
    console.log("I'm listening.");
});

io.on("connection", function(socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    console.log("socket with the id:" + socket.id + "just connected");
    let commentId = socket.request.session.userId;
    databaseActions
        .getMessages()
        .then(result => {
            console.log("runs getting messages", result.rows);
            io.sockets.emit("chatMessages", { messages: result.rows });
        })
        .catch("didnt find chatmessages in getMessages");

    socket.on("wroteChatMessage", msg => {
        console.log(commentId);
        Promise.all([
            databaseActions.getUserDetailsFromId(commentId),
            databaseActions.storeMessages(msg, commentId)
        ])
            .then(result => {
                io.sockets.emit("chatMessage", {
                    message: [...result[1].rows, result[0].rows]
                });
            })
            .catch(err => console.log(err));
    });
});
