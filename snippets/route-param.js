'use strict';

const {
  createServer
} = require('http');
const router = require('find-my-way')();

router.get('/hello/:word', (req, response, params) => {
  response.end(`<p>hello ${params.word}</p>`);
});

const server = createServer().listen(8080)
  .on('request', (req, res) => router.lookup(req, res));