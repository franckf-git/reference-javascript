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
knex.schema.hasTable('datas')
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable('datas', (table) => {
                table.increments()
                table.json('data')
            })
        }
    })

router.get('/', validation, get)
router.get('/:id', validation, getid)

router.post('/', validation, post)

router.put('/:id', validation, put)

router.delete('/:id', validation, del)

router.all('/*', imprevu)

module.exports = router