'use strict';

const {
  createServer
} = require('http');
const {
  parse
} = require('url');
const {
  format
} = require('date-fns');
const server = createServer().listen(8080);

server.on('request', (request, response) => {
  const {
    query
  } = parse(request.url, true);
  const text = format(new Date(), 'YYYY-MM-DD');

  if (query.format === 'svg') {
    response.setHeader('Content-Type', 'text/html');
    response.end(`<svg viewBox="0 0 200 100">
      <text x="0" y="50">${text}</text>
    </svg>`);
  } else {
    response.end(text);
  }
});