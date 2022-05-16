const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./config/database");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const baseurl = "/flows/api"

// server listening 
server.listen(port, () => {
  console.log(`Flows API server running on: http://localhost:${port}/flows/api`);
});

db.checkConnection();

// Admin endpoints.
app.use(baseurl + "/healthcheck", require("./healthcheck"));
app.use(baseurl + "/resetcountries", require("./resetcountries"));
app.use(baseurl + "/resetflows", require("./resetflows"));

// Functional endpoints.
app.use(baseurl + "/test", require("./test"));

process.on('SIGINT', function() {
    console.log("\Flows API server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});