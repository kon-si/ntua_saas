const db = require("../config/database");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const { kafka, clientId } = require('../broker');

const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId
})

const consume = async () => {
    db.checkConnection();
    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'flows',
        fromBeginning: true
    })
    await consumer.run({
        eachMessage: async ({ message }) => {
            const file_name = "2022_01_27_06_PhysicalFlows12.1.G.csv"
            const path = '/home/konsi/Desktop/ntua_saas/saas2022-20/microservice02/functional/';
            const date = file_name.substring(0,7).replace("_", "-");
            const month = date.substring(5, 7);
            let date_to, date_from = date + "-01";

            if (month == "02")
                date_to = date + "-28"
            else if (month == "04" || month == "06" || month == "09" || month == "11")
                date_to = date + "-30"
            else
                date_to = date + "-31"

            await db.aggreagted_generation.destroy({where: { date_time: {[Op.between]: [date_from, date_to]} }});
            
            await db.sequelize.query("COPY aggreagted_generation(date_time,resolution_code,area_code,area_type_code,area_name,map_code,production_type,actual_generation_output,actual_consumption,update_time) FROM :file DELIMITER '\t' CSV HEADER;", 
            {
                replacements: { file: path + file_name },
                type: QueryTypes.COPY
            });	
        },
    })

}

try {
    consume();
}
catch (err) {
    console.log(err);
}