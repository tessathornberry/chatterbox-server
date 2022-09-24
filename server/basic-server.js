/* Import node's http module: */
var http = require('http');
var express = require('express');

var handler = require('./request-handler'); //imported
//http://127.0.0.1:3000/classes/messages
// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = '127.0.0.1';

// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handler.requestHandler); //same as line 20
console.log('Listening on http://' + ip + ':' + port);
server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.

/** express code for same functionality ***/
// var app = express(); //npm install these and put these requires at the top
// var cors = require('cors');
// let messages = [];
// let message_id = 0;

// app.use(cors()); //always add this if it's local host
// app.use(express.json()); //always add this
// app.options('/classes/messages', (request, response) => {
//   response.status(200).end();
// });
// app.get('/classes/messages', (request, response) => {
//   response.status(200).json(messages);
// });
// app.post('/classes/messages', (request, response) => {
//   let message = request.body;
//   message.message_id = message_id;
//   message.createdAt = new Date();
//   message_id++;
//   messages.unshift(message);
//   response.status(201).json(messages);
// });
// app.listen(port, () => console.log(`listening on port ${port}`));
