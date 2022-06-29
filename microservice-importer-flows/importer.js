const path = require("path");
const fs = require('fs')
const db = require("./config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { kafka, clientId } = require('./broker');
const {Storage} = require('@google-cloud/storage');
const internal = require("stream");
const bucketName = 'flows-bucket';

const serviceKey = __dirname + '/' + 'saas-2022-bc1a910f9c03.json';
const storageConf = {keyFilename:serviceKey}
const storage = new Storage(storageConf)

async function downloadFile(srcFilename, destFilename, bucketName) {

    // passing the options
    const options = {
        destination: destFilename,
    };

    // download object from Google Cloud Storage bucket
    await storage.bucket(bucketName).file(srcFilename).download(options);

    // [optional] a good log can help you in debugging
    console.log("Downloaded " + srcFilename + " from bucket " +  bucketName);
}

const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId,
})

// let offset = 0;

const consume = async () => {
    await db.checkConnection();
    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'flows_importer',
        // autoCommit: false,
        fromBeginning: false
    })
    consumer.run({
        eachMessage: async ({ message }) => {	
            const srcFilename = `${message.value}`;
            const destFilename = __dirname + '/import_files/' + srcFilename;

            console.log("Downloading " + srcFilename);
            await downloadFile(srcFilename, destFilename, bucketName).catch(console.error);

            const date = srcFilename.substring(0,7).replace("_", "-");
            const year = date.substring(0, 4);
            const month = date.substring(5, 7);
            let date_to, date_from = date + "-01";

            if (month == "12")
                date_to = year + "-01-01"
            else
                date_to = year + "-0" + (parseInt(month) + 1).toString() + "-01"

            await db.physical_flows.destroy({where: { date_time: {[Op.between]: [date_from, date_to]} }});
            
            await db.sequelize.query("COPY physical_flows(date_time,resolution_code,out_area_code,out_area_type_code,out_area_name,out_map_code,in_area_code,in_area_type_code,in_area_name,in_map_code,flow_value,update_time) FROM :file DELIMITER '\t' CSV HEADER;", 
            {
                replacements: { file: destFilename },
                type: QueryTypes.COPY
            });	
            fs.unlink(destFilename, () => {console.log(srcFilename, ' deleted');});
        },
    })
    // offset++;
    // consumer.seek({ topic: 'flows_importer', partition: 0, offset: offset })
}

try {
    consume();
}
catch (err) {
    console.log(err);
}