const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./config/database");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

const baseurl = "/total/importer"

// server listening 
server.listen(port, () => {
  console.log(`Flows Importer server running on: http://localhost:${port}/total/importer`);
});

db.checkConnection();

// Admin endpoints.
app.use(baseurl + "/healthcheck", require("./admin/healthcheck"));
app.use(baseurl + "/resetcountries", require("./admin/resetcountries"));
app.use(baseurl + "/resettotal", require("./admin/resettotal"));

// Functional endpoints.
app.use(baseurl + "/import", require("./functional/import"));

process.on('SIGINT', function() {
    console.log("\nTotal Importer server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});