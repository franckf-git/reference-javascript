'use strict'

const mysql = require('mysql2')
require('dotenv')
  .config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root'
})

connection.query(`CREATE DATABASE IF NOT EXISTS playground CHARACTER SET 'utf8'`)
connection.query(
  `GRANT ALL PRIVILEGES ON *.* TO '${process.env.USERDB}'@'localhost' IDENTIFIED BY '${process.env.MDPDB}'`)

const db = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: process.env.USERDB,
    password: process.env.MDPDB,
    database: 'playground'
  }
})

db.schema.hasTable('basedata')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('basedata', (table) => {
        table.increments()
        table.string('entree')
        table.datetime('created_at', { precision: 6 })
          .defaultTo(db.fn.now(6))
      })
    }
  })

db.schema.hasTable('uuid_table')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('uuid_table', (table) => {
        table.string('uuid_valeur')
        table.timestamp('date_de_creation')
          .defaultTo(db.fn.now())
      })
    }
  })

db.schema.hasTable('save_radcheck')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('save_radcheck', (table) => {
        table.increments()
        table.json('objetdelapage')
        table.timestamp('date_update')
          .defaultTo(db.fn.now())
      })
    }
  })

db.schema.hasTable('table_utilisateurs')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('table_utilisateurs', (table) => {
        table.increments()
        table.string('email')
        table.string('motdepasse_enclair_BAD')
        table.string('adresse_partie1')
        table.string('adresse_partie2')
        table.string('ville')
        table.string('departement')
        table.integer('code_postal')
        table.uuid('identifiantclient')
        table.boolean('administrateur')
        table.timestamp('derniere_modification')
          .defaultTo(db.fn.now())
      })
    }
  })

db.schema.hasTable('table_authsession')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('table_authsession', (table) => {
        table.increments()
        table.string('email')
        table.string('mot_de_passe')
        table.timestamp('enregistrement')
          .defaultTo(db.fn.now())
      })
    }
  })

db.schema.hasTable('chat_table')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('chat_table', (table) => {
        table.increments()
        table.integer('iduser')
          .unsigned()
        table.foreign('iduser')
          .references('table_authsession.id')
        table.string('message')
        table.timestamp('enregistrementchat')
          .defaultTo(db.fn.now())
      })
    }
  })

module.exports = db
