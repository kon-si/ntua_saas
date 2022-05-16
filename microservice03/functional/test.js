require("dotenv").config();
const express = require("express");
const db = require("../config/database");

const app = express();
app.use(express.json());

app.post("/:country/:date_from/:date_to", async(req, res) => {
    try {
        // Get user input.
        const { country, date_from, date_to } = req.params;
        res.status(200).json({status:"success"});
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;