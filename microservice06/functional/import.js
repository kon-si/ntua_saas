const express = require("express");
const db = require("../config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

const app = express();
app.use(express.json());

app.post("", async(req, res) => {    
    try {
        const path = '/home/konsi/Desktop/ntua_saas/saas2022-20/microservice06/functional/';
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
       
        await db.actual_total.destroy({where: { date_time: {[Op.between]: [date_from, date_to]} }});
        
        await db.sequelize.query("COPY actual_total(date_time,resolution_code,area_code,area_type_code,area_name,map_code,total_load_value,update_time) FROM :file DELIMITER '\t' CSV HEADER;", 
        {
            replacements: { file: path + file_name },
            type: QueryTypes.COPY
        });

        res.status(200).json({status:"success"});
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;