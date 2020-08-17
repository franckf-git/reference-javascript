'use strict';

const {
  createServer
} = require('http');
const {
  parse
} = require('url');
const server = createServer().listen(8080);

server.on('request', (request, response) => {
  const {
    search,
    query
  } = parse(request.url, true);

  response.write(`${search}\n\n`);
  response.write(JSON.stringify(query));
  response.end();
});