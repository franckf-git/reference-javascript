'use strict';

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite3');

// création du fichier de base et de la table si ils sont absents
let sql = 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), created_at DATETIME)';
db.run(sql);

let quicky = 'CREATE TABLE IF NOT EXISTS quicky (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), created_at DATETIME)';
db.run(quicky);

module.exports = db;