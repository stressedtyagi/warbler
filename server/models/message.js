const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            require: true,
            maxLength: 160,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);
// each message will have id of what user it is coming from

messageSchema.pre("remove", async function (next) {
    // find a user
    // remove the id of the message from their message list
    // in user schema
    // save that user and return next
    try {
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
