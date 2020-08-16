'use strict'

const express = require('express')
const router = express.Router()
const Controlleur = require('./controllers')

router.get('/', Controlleur.source)
router.post('/', Controlleur.envoilog)

module.exports = router
