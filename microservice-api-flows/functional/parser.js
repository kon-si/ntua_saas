const express = require("express");
const { kafka, clientId } = require('../broker');

const app = express();
app.use(express.json());

const producer = kafka.producer(); // NEW PRODUCER

async function produce (myMessage) {
	await producer.connect();
	try {
		await producer.send({ // ADD MESSAGE TO THE LIST
			topic: 'flows_parser',
			messages: [
				{ 
                    key: String(1),
                    value: myMessage 
                },
			],
		})
	} catch (err) {
		console.error('could not write message ' + err)
	}
    
    producer.disconnect();
}

app.get("/:msg", async(req, res) => {
    try {
        const { msg } = req.params;
        await produce(msg);
        res.status(200).json({status:"success"});
    } 
    catch (err) {
        console.log(err);
        return res.status(400).json({status:"failed"});
    }
});

module.exports = app;