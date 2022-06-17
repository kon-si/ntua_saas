const express = require("express");
const cookieParser = require("cookie-parser");
const db = require("../config/database");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Login
app.get("/", async(req, res) => {
    try {
        // Get user input.
        const token = req.cookies["x-access-token"];

        // Validate if user exist in our database
        const user = await db.users.findOne({where: { auth_token: token }});
    
        if (user) {
            delete user.dataValues.password_hash;
            res.status(200).json(user);
        }
        else {
            console.log("Login: Invalid credentials.");
            res.status(400).json({status:"failed"});
        }
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;