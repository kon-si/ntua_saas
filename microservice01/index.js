const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./config/database");
const cors = require('cors');

// MIDDLEWARE FOR CROSS-ORIGIN REQUESTS
app.use(cors({
    credentials: true,
}));

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const baseurl = "/authorisation/api"

// server listening 
server.listen(port, () => {
  console.log(`Authorisation API server running on: http://localhost:${port}/authorisation/api/welcome`);
});

db.checkConnection();

app.use(baseurl + "/register", require("./register"));
app.use(baseurl + "/login", require("./login"));
app.use(baseurl + "/logout", require("./logout"));
app.use(baseurl + "/welcome", require("./welcome"));

process.on('SIGINT', function() {
    console.log("\nAuthorisation API server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});