'use strict'

const express = require('express')
const router = express.Router()
const Controlleur = require('./controllers')
const db = require('../../config/dbconnect')

db.schema.hasTable('validmail')
  .then((exists) => {
    if (!exists) {
      return db.schema.createTable('validmail', (table) => {
        table.increments()
        table.string('email')
        table.boolean('confirmer')
          .defaultTo(0)
        table.uuid('uuid')
        table.timestamp('date_envoi')
          .defaultTo(db.fn.now())
      })
    }
  })

router.get('/', Controlleur.source)
router.post('/', Controlleur.envoivalidation)
router.get('/:uid', Controlleur.urlavalidater)

module.exports = router
