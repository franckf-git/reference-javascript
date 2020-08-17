var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.get('/blog/:page/sujet', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('vous êtes à la page ' + req.params.page + ' ok ?');
});

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);