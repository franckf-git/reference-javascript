const express = require('express')
const router = express.Router()
const {
    get,
    getid,
    post,
    put,
    del
} = require('./controlleur')
const {
    imprevu
} = require('../config/mauvaises-requetes')

const {
    validation
} = require('../authentification/verificationToken')

const knex = require('../config/db')
knex.schema.hasTable('operateurs')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('operateurs', (table) => {
                table.increments()
                table.string('email')
                table.string('mot_de_passe')
                table.timestamp('enregistrement')
                    .defaultTo(knex.fn.now())
            })
        }
    })

router.get('/', validation, get)
router.get('/:id', validation, getid)

router.post('/', post)

router.put('/:id', validation, put)

router.delete('/:id', validation, del)

router.all('/*', imprevu)

module.exports = router