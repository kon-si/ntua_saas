const express = require("express");
const app = express();
const auth = require("./middleware/auth");

app.post("", auth, (req, res) => {
    res.status(200).send("Welcome 🙌");
});

module.exports = app;