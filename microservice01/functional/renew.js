require("dotenv").config();
const express = require("express");
const db = require("../config/database");
const { Op } = require("sequelize");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
app.use(express.json());

// Renew
app.post("", async(req, res) => {
    try {
        // Get user input.
        const { days } = req.body;

        // Get user input.
        const token = req.cookies["x-access-token"];

        // Validate if user exist in our database
        // const user = await db.users.findOne({where: { [Op.or]: [{email: email}, {username: username}] }});
        const user = await db.users.findOne({where: { auth_token: token }});

        // Get todays date
        const today = new Date(user.expiration_date);
        today.setDate(today.getDate() + days);
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const date_time = date + ' ' + time;
    
        if (typeof user !== "undefined") {
            // Renew user membership.
            user.expiration_date = date_time;
            await user.save();
            res.status(200).json({status:"success"});
        }
        else {
            console.log("Renew: Invalid credentials.");
            res.status(400).json({status:"failed"});
        }
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;