const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bcrypt");
const databaseActions = require("./utils/db");
const csurf = require("csurf");

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

app.use(
    cookieSession({
        secret: `jenniferAniston`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("customCSURFtoken", req.csrfToken());
    next();
});

app.post("/register", (req, res) => {
    console.log("react axios post-req to server:", req.body);
    hash(req.body.password).then(hashedPassword => {
        databaseActions
            .register(
                req.body.firstname,
                req.body.lastname,
                req.body.email,
                hashedPassword
            )
            .then(result => {
                console.log("registration succeful:", result);
                req.session.userId = result.rows[0].id;
                res.json({
                    success: true,
                    name:
                        result.rows[0].firstname + " " + result.rows[0].lastname
                });
            })
            .catch(() => {
                console.log("hashedPassword not registered");
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
                    console.log(match);
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
    console.log("loggin out");
    req.session = null;
    res.json({ logout: true });
});

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});
app.get("/user", (req, res) => {
    console.log("req.session.userId", req.session.userId);
    databaseActions
        .getUserDetailsFromId(req.session.userId)
        .then(results => {
            console.log("got userdetails", results.rows[0]);
            res.json({
                success: true,
                name:
                    results.rows[0].firstname + " " + results.rows[0].firstname,
                email: results.rows[0].email,
                image: results.rows[0].imageurl
            });
        })
        .catch(() => console.log("no results from user route"));
});
app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
