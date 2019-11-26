const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const { hash, compare } = require("./utils/bcrypt");
const databaseActions = require("./utils/db");
// const csurf = require("csurf");
// app.use(csurf);

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
                console.log("coookie", req.session.userId);
                res.json({
                    success: true
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

app.get("/welcome", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
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
