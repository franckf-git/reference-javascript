'use strict'

const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const db = require('../config/dbconnect')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const uid = ''
    const compteur = await db.select()
      .table('uuid_table')
      .count('uuid_valeur', { as: 'nombre' })
      .then(compteur => {
        return compteur
      })
      .catch(error => console.log(error))
    res.render('uuid-page', { title: 'Générateur UUID', uid: uid, compteur: compteur[0].nombre })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const uid = uuid.v4()

    const enregistrementBase = async (uuidAEnregistrer) => {
      try {
        await db('uuid_table')
          .insert({ uuid_valeur: uuidAEnregistrer })
      } catch (error) {
        console.log(error)
      }
    }

    await enregistrementBase(uid)
    const compteur = await db.select()
      .table('uuid_table')
      .count('uuid_valeur', { as: 'nombre' })
      .catch(error => console.log(error))
    res.render('uuid-page', {
      title: 'Générateur UUID',
      uid,
      compteur: compteur[0].nombre
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
