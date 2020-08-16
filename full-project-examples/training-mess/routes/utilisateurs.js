'use strict'

const express = require('express')
const router = express.Router()
const { Utilisateurs } = require('../models/accesUtilisateurs')
const utilisateursController = require('../controllers/utilisateurs_controller')
const Chance = require('chance')

router.get('/creation', async (req, res, next) => {
  const listepays = await new Utilisateurs(req.body)
    .listePays()
  res.render('creationutilisateur-page', { title: 'Creer un utilisateur', utilisateurcree: 0, listepays })
})

router.post('/creation', async (req, res, next) => {
  try {
    const utilisateur = new Utilisateurs(req.body)
    await utilisateur.creation()

    const listepays = await new Utilisateurs(req.body)
      .listePays()

    res.status(201)
    res.render('creationutilisateur-page', {
      title: 'Creer un utilisateur',
      utilisateurcree: 1,
      listepays
    })
  } catch (error) {
    console.error(error)
  }
})

router.post('/creation/aleatoire', async (req, res, next) => {
  try {
    const chance = new Chance()

    const adminrandom = () => {
      if (chance.bool()) {
        return 'on'
      } else {
        return ''
      }
    }

    const randombody = {
      inputEmail4: chance.email(),
      inputPassword4: chance.profession(),
      inputAddress1: chance.address(),
      inputAddress2: chance.address(),
      inputCity: chance.city(),
      inputState: chance.country({ full: true }),
      inputZip: chance.zip(),
      gridCheck: adminrandom()
    }
    const utilisateur = new Utilisateurs(randombody)
    await utilisateur.creation()
    res.status(201)
    res.redirect('/utilisateurs/creation')
  } catch (error) {
    console.error(error)
  }
})

router.get('/liste', utilisateursController.liste)

router.post('/suppression/:id', utilisateursController.suppression)

module.exports = router
