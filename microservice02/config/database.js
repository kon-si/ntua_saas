require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

let db = {};

const { PG_URI } = process.env;
const sequelize = new Sequelize(PG_URI);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.checkConnection = async function() {
    sequelize.authenticate().then(() => {
        console.log("Connection to flows database has been established successfully.");

        //import db models
        const countries = require("../model/countries")(sequelize, DataTypes);
        db[countries.name] = countries;
        const physical_flows = require("../model/flows")(sequelize, DataTypes);
        db[physical_flows.name] = physical_flows;
        
        sequelize.sync()
        .then(() => {
            console.log("Flows model synchronised with database.");
        })
        .catch(err => console.log(err));

    })
    .catch(err => {
        console.error("Error connecting to flows database:", err);
    });
}

module.exports = db;