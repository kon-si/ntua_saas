const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const db = require('./config/database');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

db.checkConnection();

process.on('SIGINT', function() {
    console.log('\nLogin Server Shut Down');
    db.sequelize.close();
    server.close();
    process.exit();
});