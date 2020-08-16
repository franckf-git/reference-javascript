'use strict'

const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

/* GET home page. */
router.get('/', function (req, res, next) {
  const fichierpackage = path.join(__dirname, '../', 'package.json')
  fs.readFile(fichierpackage, 'utf8', (err, data) => {
    if (err) throw err
    const version = JSON.parse(data)
      .version
    const messageSuccess = req.flash('messageSuccess')
    const messageErreur = req.flash('messageErreur')
    const messageBasic = req.flash('messageBasic')
    res.render('index', {
      title: 'playground',
      version,
      messageSuccess,
      messageErreur,
      messageBasic
    })
  })
})

module.exports = router
