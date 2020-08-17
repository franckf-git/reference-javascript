var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.get('/compteur/:nombres', function (req, res) {
    var prenoms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {
        compteurs: req.params.nombres,
        noms: prenoms
    });
});

app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);