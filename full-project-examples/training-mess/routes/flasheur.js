'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('flasheur')
})

router.post('/', (req, res) => {
  if (req.body.successbut === '') {
    req.flash('messageSuccess', req.body.message)
    res.redirect('/')
  } else if (req.body.erreurbut === '') {
    req.flash('messageErreur', req.body.message)
    res.redirect('/')
  } else if (req.body.basicbut === '') {
    req.flash('messageBasic', req.body.message)
    res.redirect('/')
  }
})

module.exports = router
