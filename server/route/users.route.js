const express = require("express");
const bcrypt = require('bcrypt');
require('dotenv').config()
var jwt = require('jsonwebtoken');
const UserModel = require("../model/users.model");
const { cookieName, requireAuth } = require("../middleware/auth.middleware");
const saltRounds = 10;
const JWT_SECRETKEY = process.env.JWT_SECRETKEY
const userRouter = express.Router();


const cookieOpts = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    // Typical short-lived access token
    maxAge: 1000 * 60 * 15 // 15 minutes
};


//singup
userRouter.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.json({ msg: "User Exist" });
        } else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    res.status(401).json({ msg: "Hashing failed" });
                } else {
                    await UserModel.create({ ...req.body, password: hash })
                    res.status(201).json({ msg: "SignUp SuccessFull..." });
                }
            });
        }
    } catch (err) {
        res.status(500).json({ Error: err.message });
    }
});



//login
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email });
        //console.log(user);
        bcrypt.compare(password, user.password, function (err, result) {
            // result == true
            if (err) {
                res.status(500).json({ msg: "Internal Seerver Error" });
            } else {
                if (result) {
                    var token = jwt.sign({ userId: user._id }, JWT_SECRETKEY);
                    res
                        .cookie(cookieName, token, cookieOpts)
                        .status(200)
                        .json({ msg: "Login Successful", token });
                } else {
                    res.status(401).json({ msg: "Wrong Password" });
                }
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Internal Seerver Error" });
    }
});



// Get current logged-in user's details
userRouter.get("/me", requireAuth, async (req, res) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
});


//logout
userRouter.get("/logout", async (req, res) => {
    try {
        // Must match the same options you used to set the cookie (path, domain, sameSite, secure)
        res.clearCookie(cookieName, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production"
        });
        return res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Seerver Error" });
    }
});



module.exports = userRouter