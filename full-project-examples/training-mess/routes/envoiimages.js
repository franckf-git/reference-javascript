'use strict'

const express = require('express')
const router = express.Router()
const envoiImagesControlleur = require('../controllers/envoiImagesControlleur')

router.get('/', envoiImagesControlleur.source)

router.post('/', envoiImagesControlleur.retourUpload)

module.exports = router
