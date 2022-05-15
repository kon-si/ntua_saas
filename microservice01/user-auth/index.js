const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require('./config/database');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

db.checkConnection();

app.use('/api/register', require('./register'));
app.use('/api/login', require('./login'));
app.use('/api/logout', require('./logout'));
app.use('/api/welcome', require('./welcome'));

process.on('SIGINT', function() {
    console.log('\nLogin Server Shut Down');
    db.sequelize.close();
    server.close();
    process.exit();
});