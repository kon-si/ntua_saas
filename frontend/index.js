const express = require('express');
const path = require('path');
var app = express();

// TEMPLATE INHERITANCE
const nunjucks = require('nunjucks');	// templating framework

nunjucks.configure(['templates/'], {
	autoescape: false,
	express: app
})

// RETURN HTML PAGE IN DEFAULT ROUTE
app.get('/', async function(req, res) {
	res.render(path.join(__dirname, './authentication-front/index.html'));
});

app.get('/login', async function(req, res) {
    res.render(path.join(__dirname, './templates/login.html'));
});

app.get('/register', async function(req, res) {
    res.render(path.join(__dirname, './authentication-front/register.html'));
});

// CONFIGURE THE PORT THE SERVER RUNS ON
app.listen(80, function () {
    console.log("Server running on: http://localhost:80");
});

// ADD ASSET FILES TO THE WEB SERVER (IMAGES, CSS, JS)
app.use(express.static(path.join(__dirname, "/assets")));
