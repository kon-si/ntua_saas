const express = require("express");
const db = require("../config/database");

const app = express();
app.use(express.json());

app.post("", async(req, res) => {
    try {
        await db.sequelize.authenticate();
        console.log("Connection to total database healthy.");
        res.status(200).json({status:"success"});

    } 
    catch (err) {
        console.log("Error connecting to total database:", err);
        res.status(400).json({status:"failed"});
    }
});

module.exports = app;