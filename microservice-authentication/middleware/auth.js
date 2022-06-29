const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies["x-access-token"] || req.headers["x-access-token"];
    if (!token) {
        console.log("Verification: No access token.")
        return res.status(400).json({status:"failed"});
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } 
    catch (err) {
        console.log("Verification: Invalid token.")
        return res.status(400).json({status:"failed"});
    }
    return next();
};

module.exports = verifyToken;