const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./config/database");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const baseurl = "/total/api"

// server listening 
server.listen(port, () => {
  console.log(`Flows API server running on: http://localhost:${port}/total/api`);
});

db.checkConnection();

// Admin endpoints.
app.use(baseurl + "/healthcheck", require("./healthcheck"));
app.use(baseurl + "/resetcountries", require("./resetcountries"));
app.use(baseurl + "/resettotal", require("./resettotal"));

// Functional endpoints.
app.use(baseurl + "/test", require("./test"));

process.on('SIGINT', function() {
    console.log("\Total API server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});