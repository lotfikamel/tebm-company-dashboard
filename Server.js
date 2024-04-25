const express = require('express');

const App = express();

App.use(express.static('public'));

App.get('*', (req, res, next) => {

	res.sendFile(__dirname + '/public/index.html');
});

const PORT = 3002;

App.listen(PORT, () => {

	console.log(`[TEBM Company Dashboard] listening for requests on Port ${PORT}...`)
});