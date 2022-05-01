const { kafka, clientId } = require('./broker');
const axios = require('axios');

// INITIALIZE A CONSUMER
const consumer = kafka.consumer({ // NEW CONSUMER
    groupId: clientId
})

async function postMessage(source) {

    let payload = {
        "info" : "Test message",
        "source" : source
    }

    let res = await axios.post('http://localhost:8000/fact', payload);
    // console.log(res);

};

const consume = async () => {

    await consumer.connect();
    await consumer.subscribe({ 
        topic: 'test-topic',
        fromBeginning: true
    })
    await consumer.run({
        eachMessage: ({ message }) => {
            console.log(`
                received message: ${message.value}
            `);	
            value = `${message.value}`;
            // console.log(value);
            postMessage(value);
        },
    })

}

module.exports = consume;