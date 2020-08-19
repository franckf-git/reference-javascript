const express = require('express')
const router = express.Router()
const {
    post
} = require('./controlleur')
const {
    imprevu
} = require('../config/mauvaises-requetes')

router.post('/', post)

router.all('/*', imprevu)

module.exports = router