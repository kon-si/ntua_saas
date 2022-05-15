const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

// Logout
app.post("", async(req, res) => {
    return res.clearCookie("x-access-token").status(200).json({status:"success"}).end();
});

module.exports = app;