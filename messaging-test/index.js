const produce = require('./producer');
const consume = require('./consumer');

produce('Test message #1').catch((err) => {
    console.error('error in producer: ', err);
})

produce('Test message #2').catch((err) => {
    console.error('error in producer: ', err);
})

produce('test message #3').catch((err) => {
    console.error('error in producer: ', err);
}) 

consume().catch((err) => {
    console.error('error in consumer: ', err);
})