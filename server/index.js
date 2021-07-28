require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authroutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const app = express();

const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// all user login routes
app.use("/api/auth", authroutes);
// all routes related to messages
app.use(
    "/api/users/:id/messages",
    loginRequired,
    ensureCorrectUser,
    messagesRoutes
);

// get all the messages of all user in DB if the user is locked in route
app.get("/api/messages", loginRequired, async function (req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({ createdAt: "desc" })
            .populate("user", {
                username: true,
                profileImageUrl: true,
            });
        return res.status(200).json(messages);
    } catch (err) {
        next(err);
    }
});
/* 
All main routes are stated here
If none of the routes work do this
error hadling
*/
app.use(function (req, res, next) {
    let err = new Error("Page Not found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`Server running at port ${PORT}`);
});
