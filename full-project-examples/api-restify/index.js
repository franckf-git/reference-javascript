'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const dotenv = require('dotenv');
dotenv.config();

// connexion à une base mongodb locale
const mongoose = require('mongoose');
mongoose.connect(
    process.env.DB_CONNECT, {
        useNewUrlParser: true
    },
    () => console.log('Connecté à la BDD')
);

// import des routes
const authRoute = require('./routes/auth');
const todoRoute = require('./routes/todo');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// routes middleware
app.use('/api/user', authRoute);
app.use('/api/todo', todoRoute);

// demarrage du serveur
app.listen(8080, () => {
    console.log('Serveur en ligne - port 8080');
});