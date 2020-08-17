/*
# Générer un certificat auto signé
openssl req -nodes -new -x509 -keyout server.key -out server.cert

# Création du serveur HTTPS
*/
const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');

/* On créer notre application Express */
const app = express();

/* On récupère notre clé privée et notre certificat (ici ils se trouvent dans le dossier certificate) */
const key = fs.readFileSync(path.join(__dirname, 'certificate', 'server.key'));
const cert = fs.readFileSync(path.join(__dirname, 'certificate', 'server.cert'));

const options = {
    key,
    cert
};

/* Puis on créer notre serveur HTTPS */
https.createServer(options, app).listen(8080, () => {
    console.log('App is running ! Go to https://localhost:8080');
});