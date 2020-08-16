'use strict'

const { enreGistrement, checkEmail, checkPassword } = require('../models/accesAuthSession')
const passport = require('passport')
const accesTableChat = require('../models/accesTableChat')

exports.source = async (req, res, next) => {
  res.render('authentificationsession/page', { title: 'Tests pour les authentifications par sessions' })
}

exports.enregistreFormulaire = async (req, res, next) => {
  res.render('authentificationsession/enregistre', { title: 'Formulaire d\'enregistrement' })
}

exports.enregistreNouveau = async (req, res, next) => {
  const { email, password, password2, cgu } = req.body
  const erreursDuFormulaire = []
  const testEmail = await checkEmail(email)

  if (!email || !password || !password2) {
    erreursDuFormulaire.push({ msg: 'les champs sont vides' })
  }
  if (testEmail[0] !== undefined) {
    erreursDuFormulaire.push({ msg: 'cet email est déjà enregistré' })
  }
  if (!cgu) {
    erreursDuFormulaire.push({ msg: 'les cgu doivent être cochées' })
  }
  if (password !== password2) {
    erreursDuFormulaire.push({ msg: 'les mots de passes sont différents' })
  }
  if (password.length < 6) {
    erreursDuFormulaire.push({ msg: 'au moins 6 caractères' })
  }
  if (password.indexOf(' ') !== -1) {
    erreursDuFormulaire.push({ msg: 'les espaces ne sont pas autorisé' })
  }
  if (erreursDuFormulaire.length > 0) {
    return res.status(401)
      .render('authentificationsession/enregistre', {
        title: 'Formulaire d\'enregistrement',
        erreursDuFormulaire,
        email,
        password,
        password2
      })
  }
  await enreGistrement(req.body)
  const succesDEnregistrement = [{ msg: 'vous êtes enregistré, vous pouvez vous connecter' }]
  res.status(201)
  res.render('authentificationsession/enregistre', {
    title: 'Formulaire d\'enregistrement',
    succesDEnregistrement
  })
}

exports.loginFormulaire = async (req, res, next) => {
  res.render('authentificationsession/login', { title: 'Page de connexion' })
}

exports.loginConnection = async (req, res, next) => {
  const { email, password } = req.body
  const erreursDuFormulaire = []
  const testEmail = await checkEmail(email)
  const testPassword = await checkPassword(email, password)

  if (!email || !password) {
    erreursDuFormulaire.push({ msg: 'les champs sont vides' })
  }
  if (!testPassword) {
    erreursDuFormulaire.push({ msg: 'Le mot de passe n\'est pas correct' })
  }
  if (testEmail[0] === undefined) {
    erreursDuFormulaire.push({ msg: 'cet email n\'est pas enregistré' })
  }
  if (password.indexOf(' ') !== -1) {
    erreursDuFormulaire.push({ msg: 'les espaces ne sont pas autorisé' })
  }
  if (erreursDuFormulaire.length > 0) {
    res.status(401)
    res.render('authentificationsession/login', {
      title: 'Page de connexion',
      erreursDuFormulaire,
      email
    })
  } else {
    passport.authenticate('local', {
      successRedirect: '/authentificationsession/chat'
    })(req, res, next)
  }
}

exports.test = async (req, res, next) => {
  res.render('authentificationsession/test', { title: req.user[0].id })
}

exports.chat = async (req, res, next) => {
  const messages = await accesTableChat.listeMessages()
  const utilisateurActuel = req.user[0].id
  res.render('authentificationsession/chat-page', {
    title: `chat ${utilisateurActuel}`,
    messages,
    utilisateurActuel
  })
}

exports.chatEnregistre = async (req, res, next) => {
  await accesTableChat.enregistrementMessage(req.user[0].id, req.body)
  res.redirect('/authentificationsession/chat')
}

exports.logout = async (req, res, next) => {
  req.logout()
  const succesLogout = [{ msg: 'vous êtes maintenant déconnecté' }]
  res.status(201)
  res.render('authentificationsession/login', {
    title: 'Page de connexion',
    succesLogout
  })
}
