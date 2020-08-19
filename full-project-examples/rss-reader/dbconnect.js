'use strict'

const knex = require('knex')({
  dialect: 'sqlite3',
  connection: {
    filename: './database.sqlite3'
  },
  useNullAsDefault: true
})

// CREATE TABLE rss (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATETIME, titre TEXT, lien TEXT)

const db = knex

module.exports = db
