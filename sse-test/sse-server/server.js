const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const http = require('http');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// let server = http.createServer(app);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Facts Events service listening at http://localhost:${PORT}`)
  })

// ENDPOINTS
let clients = [];
let facts = [];

app.get('/status', (request, response) => response.json(
    {
        clients: clients.length,
    }
));

function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);
    console.log(newClient.response);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
        // delete clients_dict[request.query.keyId]
    });
}
  
app.get('/events', eventsHandler);


function sendEventsToAll(newFact) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newFact)}\n\n`))
}
  
async function addFact(request, respsonse, next) {
    const newFact = request.body;
    facts.push(newFact);
    respsonse.json(newFact)
    return sendEventsToAll(newFact);
}

app.post('/fact', addFact);




