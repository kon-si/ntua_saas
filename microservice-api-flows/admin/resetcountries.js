const express = require("express");
const db = require("../config/database");

const app = express();
app.use(express.json());

app.post("", async(req, res) => {
    try {
        await db.countries.truncate();
        console.log("Table countries truncated.");
        res.status(200).json({status:"success"});

    } 
    catch (err) {
        console.log("Table countries truncate failed:", err);
        res.status(400).json({status:"failed"});
    }
});

module.exports = app;