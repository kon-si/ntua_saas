const express = require("express");
const app = express();

const auth = require("../middleware/auth");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.post("", auth, (req, res) => {
    res.status(200).json({status:"success"});
});

module.exports = app;