require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const db = require("./config/database");

const app = express();
const baseurl = "/api";

app.use(express.json());
app.use(cookieParser());

// Register
app.post(baseurl + "/register", async(req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        
        // Validate if user exist in our database.
        const oldUser = await db.userdb.findOne({where: { email: email.toLowerCase() }});
        
        if (oldUser) {
            console.log("Register: User exists.")
            return res.status(400).json({status:"failed"});
        }
        
        //Encrypt user password.
        encryptedPassword = await bcrypt.hash(password, 10);
        
        // Create user in our database.
        const user = await db.userdb.build({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        await user.save();

        // return new user
        res.cookie("x-access-token", token, { httpOnly: true }).status(200).json(user);
    } 
    catch (err) {
        console.log(err);
    }
});
    
// Login
app.post(baseurl + "/login", async(req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
        let token;
        // Validate if user exist in our database
        const user = await db.userdb.findOne({where: { email: email }});
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
            token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
            );
    
            // save user token
            user.token = token;
            await user.save();
        
            // user
            res.cookie("x-access-token", token, { httpOnly: true }).status(200).json(user);
        }
        else {
            console.log("Login: Invalid credentials.");
            res.status(400).json({status:"failed"});
        }
    } 
    catch (err) {
        console.log(err);
    }
});

// Logout
app.post(baseurl + "/logout", async(req, res) => {
    return res.clearCookie("x-access-token").status(200).end();
});

const auth = require("./middleware/auth");

app.post(baseurl + "/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌");
});

module.exports = app;