'use strict'

const express = require('express')
const router = express.Router()
const envoiMail = require('../models/envoiMail')

router.get('/', function (req, res, next) {
  res.render('mail-page', { title: 'Formulaire de mail', statusmail: 'pas de mail envoyé' })
})

router.post('/', async (req, res) => {
  try {
    const objectform = req.body
    if (!objectform.maildedestination) {
      res.status(200)
      res.render('mail-page', { title: 'Formulaire de mail', statusmail: 'pas de mail renseigné' })
    }
    envoiMail.envoi(objectform)
      .then(res.render('mail-page', {
        title: 'Formulaire de mail',
        statusmail: `mail envoyé à ${objectform.maildedestination}`
      }))
      .catch(error => console.error(error.message))
  } catch (error) {
    console.log(error)
    res.render('mail-page', { title: 'Formulaire de mail', statusmail: error })
  }
})
module.exports = router
