const { kafka } = require('./broker');

// ITIANIALIZE A PRODUCER
const producer = kafka.producer(); // NEW PRODUCER

const produce = async (myMessage) => {
	await producer.connect();
	let i = 0;

	setInterval(async () => {
		try {
			await producer.send({ // ADD MESSAGE TO THE LIST
				topic: 'test-topic',
				messages: [
					{ 
                        key: String(i),
                        value: 'Message ' + i + ' : ' + myMessage 
                    },
				],
			})
			i++
		} catch (err) {
			console.error('could not write message ' + err)
		}
	}, 1000)
	
	// producer.disconnect();
}

module.exports = produce;