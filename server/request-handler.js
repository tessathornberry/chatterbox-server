/********* headers ************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};
/********* posted messages ************/
let messages = [];

let message_id = 0;

/********* ACTUAL REQUEST HANDLER FUNCTION WE ARE WORKING IN ************/
var requestHandler = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;

  /********* our helper function ************/
  const addMessage = (message) => {
    messages.unshift(message);
    message_id++;
  };

  /********* console message describing activity ************/
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  const { method, url } = request;

  // Tell the client we are sending them JSON.
  headers['Content-Type'] = 'application/json';

  /********* our conditional statements ************/
  if (method === 'OPTIONS') {
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(headers['access-control-allow-methods']);

    // response.end(JSON.stringify(headers['access-control-allow-methods']));
  } else if (method === 'GET' && url === '/classes/messages') {
    //might need to iterate messages to find the correct message?
    statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messages)); //should this be all messages or just the added one?
  } else if (method === 'POST' && url === '/classes/messages') {
    statusCode = 201; //I added this based on the test
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body); //added this to parse the string we got back
      body.message_id = message_id;
      body.createdAt = new Date();
      addMessage(body);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messages));
    });
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('sorry that endpoint does not exist');
  }
};

module.exports.requestHandler = requestHandler;

/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

// console.log('request', request);

// Request and Response come from node's http module.
//
// They include information about both the incoming request, such as
// headers and URL, and about the outgoing response, such as its status
// and content.
//
// Documentation for both request and response can be found in the HTTP section at
// http://nodejs.org/documentation/api/

// Do some basic logging.
//
// Adding more logging to your server can be an easy way to get passive
// debugging help, but you should always be careful about leaving stray
// console.logs in your code.

// .writeHead() writes to the request line and headers of the response,
// which includes the status and all headers.
// response.writeHead(statusCode, headers);

// Make sure to always call response.end() - Node may not send
// anything back to the client until you do. The string you pass to
// response.end() will be the body of the response - i.e. what shows
// up in the browser.
//
// Calling .end "flushes" the response's internal buffer, forcing
// node to actually send all the data over to the client.
// response.end('Hello, World!'); //already tried commenting this out