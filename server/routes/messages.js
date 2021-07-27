const express = require("express");
// mergeParams helps us to get access to id inside the router
const router = express.Router({ mergeParams: true });
const {
    createMessage,
    getMessage,
    deleteMessage,
} = require("../handlers/messages");

// route - /api/users/:id/messages
router.route("/").post(createMessage);

// (GET) req : /api/users/:id/messages/:message_id
// (DELETE) req : /api/users/:id/messages/:message_id
router.route("/:message_id").get(getMessage).delete(deleteMessage);

module.exports = router;
