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

app.use(baseurl + "/test", require("./test"));

process.on('SIGINT', function() {
    console.log("\Flows API server shuting down.");
    db.sequelize.close();
    server.close();
    process.exit();
});