const express = require("express");
const db = require("../config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

const app = express();
app.use(express.json());

app.post("", async(req, res) => {    
    try {
        // Get user input.
        const { file_name } = req.body;
        const date = file_name.substr(0,7).replace("_", "-");
        const month = date.substr(5, 6);
        let date_to, date_from = date + "-01";

        if (month == "02")
            date_to = date + "-28"
        else if (month == "04" || month == "06" || month == "09" || month == "11")
            date_to = date + "-30"
        else
            date_to = date + "-31"
       
        const data = await db.actual_total.findAll({where: { date_time: {[Op.between]: [date_from, date_to]} }});

        await db.sequelize.query("DELETE FROM actual_total WHERE date_time BETWEEN :from AND :to", 
        {
            replacements: { from: date_from, to: date_to },
            type: QueryTypes.DELETE
        });
        
        path = '/home/konsi/Desktop/ntua_saas/saas2022-20/microservice06/functional/2022_01_22_00_ActualTotalLoad6.1.A.csv';
        await db.sequelize.query("COPY actual_total(date_time,resolution_code,area_code,area_type_code,area_name,map_code,total_load_value,update_time) FROM :file DELIMITER '\t' CSV HEADER;", 
        {
            replacements: { file: path },
            type: QueryTypes.COPY
        });

        res.status(200).json(data);
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;