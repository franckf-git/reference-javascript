'use strict'

const express = require('express')
const router = express.Router()
const accesTableBase = require('../models/accesTableBase')

router.get('/', function (req, res, next) {
  accesTableBase.renvoiContenuBase()
    .then((lignes) => res.render('base-page', {
      title: 'Ce qu\'il y a dans la base',
      lignes
    }))
})

router.post('/enregistrement', function (req, res, next) {
  let messageASauvegarder = req.body.message
  if (messageASauvegarder === '') {
    messageASauvegarder = 'Votre message était vide'
  }
  accesTableBase.enregistrementBase(messageASauvegarder)
  accesTableBase.renvoiContenuBase()
    .then((lignes) => res.render('base-page', { title: 'Enregistré', lignes }))
})

router.post('/chercher', function (req, res, next) {
  const recherche = req.body.recherche
  accesTableBase.rechercheEntree(recherche)
    .then((resultats) => res.render('base-page', { title: 'Resultat de la recherche', lignes: resultats }))
})

module.exports = router
