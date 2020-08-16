'use strict'

const express = require('express')
const router = express.Router()
const authSessionControlleur = require('../controllers/authSessionControlleur')
const { verificationAuth, dejaAuthentifie } = require('../middlewares/authentification/auth')

router.get('/', dejaAuthentifie, authSessionControlleur.source)

router.get('/enregistre', dejaAuthentifie, authSessionControlleur.enregistreFormulaire)
router.post('/enregistre', authSessionControlleur.enregistreNouveau)

router.get('/login', dejaAuthentifie, authSessionControlleur.loginFormulaire)
router.post('/login', authSessionControlleur.loginConnection)

router.get('/test', verificationAuth, authSessionControlleur.test)

router.get('/chat', verificationAuth, authSessionControlleur.chat)
router.post('/chat', verificationAuth, authSessionControlleur.chatEnregistre)

router.get('/logout', authSessionControlleur.logout)

module.exports = router
