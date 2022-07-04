const db = require("./config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

async function consume() {
            await db.sequelize.query("LOAD DATA LOCAL INFILE :file INTO TABLE physical_flows CHARACTER SET 'utf8mb4' FIELDS TERMINATED BY '\t'", 
            {
                replacements: { file: destFilename },
                type: QueryTypes.COPY
            });
}

// CONTINUOUSLY RUN THE CONSUMER (FOR PARSER MESSAGES)
try {
    consume();
}
catch (err) {
    console.log(err);
}