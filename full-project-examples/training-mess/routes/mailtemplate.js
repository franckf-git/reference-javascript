'use strict'

const express = require('express')
const router = express.Router()
const MailTemplateControlleur = require('../controllers/MailTemplateControlleur')

router.get('/', MailTemplateControlleur.source)

router.post('/', MailTemplateControlleur.envoiMail)

module.exports = router
