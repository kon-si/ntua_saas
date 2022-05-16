require("dotenv").config();
const express = require("express");
const db = require("../config/database");

const app = express();
app.use(express.json());

app.post("/:country_from/:country_to/:date_from/:date_to", async(req, res) => {
    try {
        // Get user input.
        const { country_from, country_to, date_from, date_to } = req.params;
        console.log(country_from, country_to, date_from, date_to);
        res.status(200).json({status:"success"});
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;