'use strict'

const express = require('express')
const router = express.Router()
const EventEmitter = require('events')
const Evenement = new EventEmitter()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('listen')
})

router.post('/', (req, res) => {
  Evenement.emit('event')
  res.render('listen')
})

Evenement.on('event', () => {
  setImmediate(() => {
    console.log('il se passe quelque chose')
  })
})

module.exports = router
