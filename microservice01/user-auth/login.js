require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const db = require("./config/database");
const { Op } = require("sequelize");

const app = express();
app.use(express.json());

// Login
app.post("", async(req, res) => {
    try {
        // Get user input.
        const { username, email, password } = req.body; console.log(username, email);
        let token;

        // Validate if user exist in our database
        const user = await db.users.findOne({where: { [Op.or]: [{email: email}, {username: username}] }});
    
        if (user && (await bcrypt.compare(password, user.password_hash))) {
          // Create token.
            token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
            );
    
            // Save user token.
            user.auth_token = token;
            await user.save();
        
             // Create JWT token cookie.
            res.cookie("x-access-token", token, { httpOnly: true }).status(200).json(user);
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