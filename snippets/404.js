'use strict';

const {
  createServer
} = require('http');
const server = createServer().listen(8080);

server.on('request', (request, response) => {
  if (request.url === '/') {
    response.end('<a href="/hello">clique-moi</a>');
  } else {
    response.statusCode = 404;
    response.end('<h1>Page introuvable</h1>');
  }
});