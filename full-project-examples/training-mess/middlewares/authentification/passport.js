'use strict'

const db = require('../../config/dbconnect')
const LocalStrategy = require('passport-local')
  .Strategy

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (emailDeConnexion, passwordATester, done) => {
      const utilisateurEnBase = await db('table_authsession')
        .select()
        .where({ email: emailDeConnexion })
      return done(null, utilisateurEnBase)
    }))

  passport.serializeUser((utilisateurEnBase, done) => {
    done(null, utilisateurEnBase[0].id)
  })

  passport.deserializeUser(async (id, done) => {
    const idUtilisateurEnBase = await db('table_authsession')
      .select('id')
      .where({ id: id })
    done(null, idUtilisateurEnBase)
  })
}
