const path = require('path')
require("dotenv").config({ path: path.resolve(__dirname, './.env') });
const { Kafka } = require ('kafkajs'); // Kafka instance

const clientId = process.env.KAFKA_CLIENT; // it lets kafka know who produced the messages

// INITIALIZE A BROKER
const kafka = new Kafka({
	clientId: clientId,
	brokers: [process.env.KAFKA_BROKER],
	// FOR CONFLUENT
	// ssl: true,
	// sasl: {
	// 	mechanism: 'plain',
	// 	username: process.env.KAFKA_USERNAME,
	// 	password: process.env.KAFKA_PASSWORD
	// },
	// connectionTimeout: process.env.KAFKA_TIMEOUT,
	// requestTimeout: parseInt(process.env.KAFKA_TIMEOUT)
});

module.exports = { kafka, clientId };