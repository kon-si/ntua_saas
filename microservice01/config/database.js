require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

let db = {};

const { PG_URI } = process.env;
const sequelize = new Sequelize(PG_URI);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.checkConnection = async function() {
    sequelize.authenticate().then(() => {
        console.log("Connection to users database has been established successfully.");

        //import db models
        const users = require("../model/user")(sequelize, DataTypes);
        db[users.name] = users;

        sequelize.sync()
        .then(() => {
            console.log("Users model synchronised with database.");
        })
        .catch(err => console.log(err));

    })
    .catch(err => {
        console.error("Error connecting to users database:", err);
    });
}

module.exports = db;