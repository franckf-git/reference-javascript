'use strict'

const express = require('express')
const router = express.Router()
const accessTableRadCheck = require('../models/accesTableRadCheck')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const configsauvegardedelapage = await accessTableRadCheck.renvoiContenuTable()
    const objetsauve = JSON.parse(configsauvegardedelapage[0].objetdelapage)
    res.render('radio-check-page', {
      title: 'Sauvegarde des checkbox',
      config: objetsauve
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const choixRadio = req.body.gridRadios
    const choixBox1 = req.body.gridCheck1
    const choixBox2 = req.body.gridCheck2
    const tousLesChoix = { choixRadio, choixBox1, choixBox2 }
    await accessTableRadCheck.enregistrementTable(tousLesChoix)

    const configsauvegardedelapage = await accessTableRadCheck.renvoiContenuTable()
    const objetsauve = JSON.parse(configsauvegardedelapage[0].objetdelapage)
    res.render('radio-check-page', {
      title: 'Sauvegarde des checkbox',
      config: objetsauve
    })
  } catch (error) {
    console.log(error)
  }
})

router.post('/resetconfig', async (req, res, next) => {
  try {
    const tousLesChoix = {}
    await accessTableRadCheck.enregistrementTable(tousLesChoix)

    const configsauvegardedelapage = await accessTableRadCheck.renvoiContenuTable()
    const objetsauve = JSON.parse(configsauvegardedelapage[0].objetdelapage)
    res.render('radio-check-page', {
      title: 'Sauvegarde des checkbox',
      config: objetsauve
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
