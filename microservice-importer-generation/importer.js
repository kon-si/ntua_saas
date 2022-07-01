const path = require("path");
const fs = require('fs');
const AdmZip = require("adm-zip");
const db = require("./config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { kafka, clientId } = require('./broker');
const {Storage} = require('@google-cloud/storage');

const bucketName = 'generation-bucket';
const serviceKey = __dirname + '/' + 'saas-2022-bc1a910f9c03.json';
const storageConf = {keyFilename:serviceKey};
const storage = new Storage(storageConf);

async function downloadFile(srcFilename, destFilename, bucketName) {
    const options = {
        destination: destFilename,
    };

    // download object from Cloud Storage bucket
    await storage.bucket(bucketName).file(srcFilename).download(options);

    console.log("Downloaded " + srcFilename + " from " +  bucketName);
}

const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId,
})

const consume = async () => {
    await db.checkConnection();
    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'generation_importer',
        fromBeginning: false
    })
    consumer.run({
        eachMessage: async ({ message }) => {	
            const srcFilenameZip = `${message.value}`;
            const srcFilename = srcFilenameZip.substring(0, srcFilenameZip.lastIndexOf(".")) + ".csv";
            const destFilenameZip = __dirname + '/import_files/' + srcFilenameZip;
            const destFilename = __dirname + '/import_files/' + srcFilename;

            console.log("Downloading " + srcFilenameZip);
            await downloadFile(srcFilenameZip, destFilenameZip, bucketName).catch(console.error);

            const zip = new AdmZip(destFilenameZip);
            zip.extractAllTo(__dirname + '/import_files');
            console.log("Extracted " + srcFilename);

            const date = srcFilename.substring(0,7).replace("_", "-");
            const year = date.substring(0, 4);
            const month = date.substring(5, 7);
            let date_to, date_from = date + "-01";

            if (month == "12")
                date_to = (parseInt(year) + 1).toString() + "-01-01"
            else
                date_to = year + "-0" + (parseInt(month) + 1).toString() + "-01"

            await db.aggregated_generation.destroy({where: { date_time: {[Op.between]: [date_from, date_to]} }});
            
            await db.sequelize.query("COPY aggregated_generation(date_time,resolution_code,area_code,area_type_code,area_name,map_code,production_type,actual_generation_output,actual_consumption,update_time) FROM :file DELIMITER '\t' CSV HEADER;", 
            {
                replacements: { file: destFilename },
                type: QueryTypes.COPY
            });

            fs.unlink(destFilenameZip, () => {console.log(srcFilenameZip, ' deleted');});	
            fs.unlink(destFilename, () => {console.log(srcFilename, ' deleted');});
        },
    })
}

try {
    consume();
}
catch (err) {
    console.log(err);
}