const { kafka, clientId } = require('./broker');

// INITIALIZE A CONSUMER
const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId
})

const consume = async () => {

    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'total',
        fromBeginning: true
    })
    await consumer.run({
        eachMessage: ({ message }) => {
            console.log(`
                received message: ${message.value}
            `);	
            value = `${message.value}`;
            atApiCall();
        },
    })

}

module.exports = consume;