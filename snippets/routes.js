'use strict';

const {
  createServer
} = require('http');
const router = require('find-my-way')();

router.get('/', (request, response) => {
  response.end('<a href="/coucou">clique-moi</a>');
});

router.get('/coucou', (request, response) => {
  response.end('<a href="/">retour</a>');
});

const server = createServer().listen(4000)
  .on('request', (req, res) => router.lookup(req, res));