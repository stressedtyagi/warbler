const db = require("../models");

exports.createMessage = async function (req, res, next) {
    try {
        // we will send user id in the URL of request
        // create new message in message DB
        let message = await db.Message.create({
            text: req.body.text,
            user: req.params.id,
        });
        // find that message user and push that message to messages array
        // in user schema and save the changes
        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message.id);
        await foundUser.save();
        // did this to immidiatly return the new message along with
        // populated profileImageURl and username of user with response
        let foundMessage = await db.Message.findById(message._id).populate(
            "user",
            {
                username: true,
                profileImageUrl: true,
            }
        );
        return res.status(200).json(foundMessage);
    } catch (err) {
        return next(err);
    }
};

// Prefix (GET) req : /api/users/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
    try {
        let message = await db.Message.findById(req.params.message_id);
        return res.status(200).json(message);
    } catch (err) {
        next(err);
    }
};

// Prefix (DELETE) req : /api/users/:id/messages/:message_id
exports.deleteMessage = async function (req, res, next) {
    try {
        console.log(req.params.message_id);
        let foundMessage = await db.Message.findById(req.params.message_id);
        console.log(foundMessage);
        await foundMessage.remove();
        return res.status(200).json(foundMessage);
    } catch (err) {
        next(err);
    }
};
