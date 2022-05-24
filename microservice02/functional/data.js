require("dotenv").config();
const express = require("express");
const db = require("../config/database");
const { Op } = require("sequelize");

const app = express();
app.use(express.json());

app.post("/:out_map_code/:in_map_code/:date_from/:date_to", async(req, res) => {
    try {
        // Get user input.
        const { out_map_code, in_map_code, date_from, date_to } = req.params;
        const data = await db.physical_flows.findAll({where: { out_map_code: out_map_code, in_map_code: in_map_code, date_time: {[Op.between]: [date_from, date_to]} }});
        
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