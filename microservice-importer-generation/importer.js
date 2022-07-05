const path = require("path");
const fs = require('fs');
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const AdmZip = require("adm-zip");
const csvtojson = require('csvtojson');
const db = require("./config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { kafka, clientId } = require('./broker');
const {Storage} = require('@google-cloud/storage');

const port = 9107;
// server listening 
server.listen(port, () => {
    console.log(`Total Importer server running on: http://localhost:${port}/`);
});

const bucketName = 'generation-bucket';
const serviceKey = __dirname + '/' + 'saas-2022-bc1a910f9c03.json';
const storageConf = { keyFilename:serviceKey };
const storage = new Storage(storageConf);

// KAFKA COMMUNICATION WITH PARSER AND APIs
const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId,
})

const producer = kafka.producer(); // NEW PRODUCER

async function produce (myMessage) {
	await producer.connect();
	try {
		await producer.send({ // ADD MESSAGE TO THE LIST
			topic: 'generation',
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

// CORE IMPORT FUNCTIONS
async function downloadFile(srcFilename, destFilename, bucketName) {
    const options = {
        destination: destFilename,
    };

    // download object from Cloud Storage bucket
    await storage.bucket(bucketName).file(srcFilename).download(options);

    console.log("Downloaded " + srcFilename + " from " +  bucketName);
}

function calc_end_date(month, year) {
    let end_date = '';
    if (month == "12") {
        end_date = (parseInt(year) + 1).toString() + "-01-01"
    } else {
        end_date = year + "-"

        if (parseInt(month) < 9)
            end_date += "0"

        end_date += (parseInt(month) + 1).toString() + "-01"
    }

    return end_date;
}

const consume = async () => {
    await db.checkConnection();
    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'generation_importer',
        fromBeginning: false
    })
    consumer.run({
        eachMessage: async ({ message }) => {	// on new message from parser
            // #1 DOWNLOAD THE ZIP FROM THE SHARED STORAGE
            const srcFilenameZip = `${message.value}`;
            const srcFilename = srcFilenameZip.substring(0, srcFilenameZip.lastIndexOf(".")) + ".csv";
            const destFilenameZip = __dirname + '/import_files/' + srcFilenameZip;
            const destFilename = __dirname + '/import_files/' + srcFilename;

            console.log("Downloading " + srcFilenameZip + " ...");
            await downloadFile(srcFilenameZip, destFilenameZip, bucketName).catch(console.error);

            // #2 UNZIP THE ZIP FILE
            const zip = new AdmZip(destFilenameZip);
            zip.extractAllTo(__dirname + '/import_files');
            console.log("Extracted " + srcFilename);

            // #3 GET THE START, END DATES FROM THE FILE TITLE
            const date = srcFilename.substring(0,7).replace("_", "-");  // ex. 2022-01
            const year = date.substring(0, 4);  // ex. 2022
            const month = date.substring(5, 7); // ex. 01
            let date_from = date + "-01";
            let date_to = calc_end_date(month, year);

            // #4 DELETE THE OLD DATA AND IMPORT THE NEW ONES
            await db.aggregated_generation.destroy({where: { date_time: {[Op.between]: [date_from, date_to]} }});
            
            await csvtojson({ delimiter:["\t"], ignoreEmpty: true }).fromFile(destFilename)
            .then(data => {
                db.aggregated_generation.bulkCreate(data).then(() => console.log("Imported " + srcFilename + " to database"));
            }).catch(err => {
                console.log(err);
            });
            
            // #5 DELETE THE ZIP FILES
            fs.unlink(destFilenameZip, () => {console.log(srcFilenameZip, ' deleted');});	
            fs.unlink(destFilename, () => {console.log(srcFilename, ' deleted');});

            // #6 NOTIFY THE API FOR NEW DATA IMPORT
            await produce('{ "StartDate" : "' + date_from + '", "EndDate" : "' + date_to + '"}');
        },
    })
}

// CONTINUOUSLY RUN THE CONSUMER (FOR PARSER MESSAGES)
try {
    consume();
}
catch (err) {
    console.log(err);
}