require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./config/database");

const app = express();
app.use(express.json());

// Register
app.post("", async(req, res) => {
    try {
        const { first_name, last_name, username, email, password } = req.body;
        
        // Validate if user exist in our database.
        const oldUser = await db.users.findOne({where: { email: email.toLowerCase() }});
        
        if (oldUser) {
            console.log("Register: User exists.")
            return res.status(400).json({status:"failed"});
        }
        
        //Encrypt user password.
        encryptedPassword = await bcrypt.hash(password, 10);
        
        // Create user in our database.
        const user = await db.users.build({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(), // Convert email to lowercase.
            password_hash: encryptedPassword,
            username: username,
        });
        
        // Create token.
        const token = jwt.sign(
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
        res.cookie("x-access-token", token, { httpOnly: true, sameSite: "none", secure: true }).status(200).json({status:"success"});
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;