const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
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

        if (typeof token !== "undefined") {
            // Validate if user exist in our database
            // const user = await db.users.findOne({where: { [Op.or]: [{email: email}, {username: username}] }});
            const user = await db.users.findOne({where: { auth_token: token }});

            // Get todays date
            const today = new Date();
            const expDate = new Date(user.expiration_date);
            const selectedDate = new Date(Math.max(today, expDate));    // if expiration day is before today consider today as expiration day
            selectedDate.setDate(selectedDate.getDate() + days);
            const date = selectedDate.getFullYear()+'-'+(selectedDate.getMonth()+1)+'-'+selectedDate.getDate();
            const time = selectedDate.getHours() + ":" + selectedDate.getMinutes() + ":" + selectedDate.getSeconds();
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
        } else {
            console.log("Account not found !");
            res.status(400).json({status:"failed"});
        }
        
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;