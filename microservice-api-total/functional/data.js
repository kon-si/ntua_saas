const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const db = require("../config/database");
const { Op } = require("sequelize");

const app = express();
app.use(express.json());

async function getTotalData(mapCode, dateFrom, dateTo) {
    let data = await db.actual_total.findAll({where: { map_code: mapCode, date_time: {[Op.between]: [dateFrom, dateTo]} }});
    return data;
}

app.get("/:map_code/:date_from/:date_to", async(req, res) => {
    try {
        // Get user input.
        const { map_code, date_from, date_to } = req.params;
        const data = await db.actual_total.findAll({where: { map_code: map_code, date_time: {[Op.between]: [date_from, date_to]} }});
        
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const date_time = date + ' ' + time;

        const response = {
            "RequestTimestamp": date_time,
            "Data": data
        };
        res.status(200).json(response);
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;