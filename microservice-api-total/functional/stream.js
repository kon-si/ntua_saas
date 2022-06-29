const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, '../.env') });
const express = require("express");
const db = require("../config/database");
const { Op } = require("sequelize");
const { kafka, clientId } = require('../broker');

const app = express();
app.use(express.json());

// Initialize clients
let clients = [];

// Initialize consumer
const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId
})

const consume = async () => {

    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'total',
        fromBeginning: false
    })
    await consumer.run({
        eachMessage: ({ message }) => {
            console.log(`
                received message: ${message.value}
            `);	
            // Calculate time period of the new data
            let value = message.value.toString();
            value = value.replace(/-/g, '');
            console.log(value);
            const value_parsed = JSON.parse(value);
            console.log(
                'This is starting day : ' + value_parsed['StartDate']
            );
            // API call url
            sendEventsToAll(value_parsed['StartDate'], value_parsed['EndDate']);
        },
    })

}

async function getTotalData(mapCode, dateFrom, dateTo) {
    let data = await db.actual_total.findAll({where: { map_code: mapCode, date_time: {[Op.between]: [dateFrom, dateTo]} }});
    return data;
}

app.get("/:map_code/:date_from/:date_to", async(req, res) => {
    try {
        // Set Headers
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
        };
        res.writeHead(200, headers);

        // Get user input.
        const { map_code, date_from, date_to } = req.params;
        // const data = await db.actual_total.findAll({where: { map_code: map_code, date_time: {[Op.between]: [date_from, date_to]} }});
        const data = await getTotalData(map_code, date_from, date_to);
        
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const date_time = date + ' ' + time;

        // const response = `data: ${JSON.stringify(data)}\n\n`;
        // RequestTimestamp: ${JSON.stringify(date_time)},
        // const response = `requestTimestamp: ${JSON.stringify(date_time)}, data: ${JSON.stringify(data)}\n\n`;
        const response = {
            "RequestTimestamp": date_time,
            "Data": data
        };
        const response_data = `data: ${JSON.stringify(response)}\n\n`;

        res.write(response_data);

        // Save new client
        const clientId = Date.now();
        const newClient = {
            id: clientId,
            map_code: map_code,
            date_from: date_from,
            date_to: date_to,
            response: res
        }
        clients.push(newClient);
        console.log('Current number of clients : ' + clients.length);

        req.on('close', () => {
            console.log(`${clientId} Connection closed`);
            clients = clients.filter(client => client.id !== clientId);
            console.log('Current number of clients : ' + clients.length);
        });

    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

// consume () -> consume_period = from : 01012022 to : 01032022
consume().catch((err) => {
    console.error('error in consumer: ', err);
})

async function sendEventsToAll(dataFrom, dataTo) {

    // parsedMessage = JSON.parse(message);
    console.log('Sending new data ...');
    // for all clients : if date in consume_period -> send again the data
    for (const client of clients) {
        if (doOverlap(client.date_from, client.date_to, dataFrom, dataTo)) {
            const newData = await getTotalData(client.map_code, client.date_from, client.date_to);
            const newResponse = {
                "Data": newData
            }
            client.response.write(`data: ${JSON.stringify(newResponse)}\n\n`);
        }
        // console.log('New data : ' + JSON.stringify(newResponse));
    }

}

// dateFrom, dateTo : time period of client request
// messageFrom, messageTo : time period of new data
function doOverlap(dateFrom, dateTo, messageFrom, messageTo) { 
    if ((dateFrom >= messageFrom && dateFrom <= messageTo) || (dateTo >= messageFrom && dateTo <= messageTo)  || (dateFrom <= messageFrom && dateTo >= messageTo)) {
        return true;
    } else {
        return false;
    }
}

module.exports = app;