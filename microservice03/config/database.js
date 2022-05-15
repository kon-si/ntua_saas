require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

let db = {};

const { PG_URI } = process.env;
const sequelize = new Sequelize(PG_URI);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.checkConnection = async function() {
    sequelize.authenticate().then(() => {
        console.log("Connection to total database has been established successfully.");

        //import db models
        const countries = require("../model/countries")(sequelize, DataTypes);
        db[countries.name] = countries;
        const actual_total = require("../model/total")(sequelize, DataTypes);
        db[actual_total.name] = actual_total;
        
        sequelize.sync()
        .then(() => {
            console.log("Total model synchronised with database.");
        })
        .catch(err => console.log(err));

    })
    .catch(err => {
        console.error("Error connecting to total database:", err);
    });
}

module.exports = db;