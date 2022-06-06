const express = require('express');
const path = require('path');
var app = express();

const PORT = 80;

// TEMPLATE INHERITANCE
const nunjucks = require('nunjucks');	// templating framework

nunjucks.configure(['templates/'], {
	autoescape: false,
	express: app
})

// ROUTES
app.use('/', require('./routes/home.routes'));
app.use('/total', require('./routes/total.routes'));
app.use('/generation', require('./routes/generation.routes'));
app.use('/flows', require('./routes/flows.routes'));

// API ROUTES
app.use('/login', require('./routes/auth/login.routes'));
app.use('/register', require('./routes/auth/register.routes'));

// CONFIGURE THE PORT THE SERVER RUNS ON
app.listen(PORT, function () {
    console.log("Server running on: http://localhost:80");
});

// ADD ASSET FILES TO THE WEB SERVER (IMAGES, CSS, JS)
app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.static(path.join(__dirname, "/bundles/dist")));
