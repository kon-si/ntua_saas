const express = require("express");
const db = require("../config/database");

const app = express();
app.use(express.json());

// Login
app.get("", async(req, res) => {
    try {
        // Get user input.
        const { token } = req.body;

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