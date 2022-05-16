const express = require("express");
const db = require("./config/database");

const app = express();
app.use(express.json());

app.post("", async(req, res) => {
    try {
        await db.actual_total.truncate();
        console.log("Table actual_total truncated.");
        res.status(200).json({status:"success"});

    } 
    catch (err) {
        console.log("Table actual_total truncate failed:", err);
        res.status(400).json({status:"failed"});
    }
});

module.exports = app;