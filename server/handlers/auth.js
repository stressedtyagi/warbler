const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
    // finding a user
    try {
        let user = await db.User.findOne({
            email: req.body.email,
        });
        let { id, username, profileImageUrl } = user;

        // compare current password entered with DB hash
        let isMatch = await user.comparePassword(req.body.password);
        // if true then return JWT else print error
        if (isMatch) {
            let token = jwt.sign(
                {
                    id,
                    username,
                    profileImageUrl,
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
                token,
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password ",
            });
        }
    } catch (err) {
        return next({
            status: 400,
            message: "Invalid Email/Password ",
        });
    }
};

exports.signup = async function (req, res, next) {
    try {
        // create a user
        let user = await db.User.create(req.body);
        // create a jwt (signing a token)
        let { id, username, profileImageUrl } = user;
        let token = jwt.sign(
            {
                id,
                username,
                profileImageUrl,
            },
            process.env.SECRET_KEY
        );
        // process.env.SECRET_KEY is in .env file
        return res.status(200).json({
            id,
            username,
            profileImageUrl,
            token,
        });
    } catch (err) {
        // 11000 is code when validation fails
        if (err.code === 11000) {
            err.message = "Sorry, username and email is already taken";
        }
        // see what kind of error
        // if it is a certian error
        // respond with username/email token already exist
        // otherwise just send the generic error 400
        return next({
            status: 400,
            message: err.message,
        });
    }
};
