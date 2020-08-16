'use strict'

const db = require('../config/dbconnect')
const bcrypt = require('bcrypt')

exports.enreGistrement = async (infosFormulaire) => {
  try {
    const passwordHash = await bcrypt.hash(infosFormulaire.password, 12)
    await db('table_authsession')
      .insert({
        email: infosFormulaire.email,
        mot_de_passe: passwordHash
      })
  } catch (error) {
    console.error(error)
  }
}

exports.checkEmail = async (emailATester) => {
  try {
    return await db('table_authsession')
      .select('email')
      .where({ email: emailATester })
  } catch (error) {
    console.error(error)
  }
}

exports.checkPassword = async (emailDeConnexion, passwordATester) => {
  try {
    const passwordEnBase = await db('table_authsession')
      .select('mot_de_passe')
      .where({ email: emailDeConnexion })
    if (typeof passwordEnBase[0] !== 'undefined') {
      return bcrypt.compare(passwordATester, passwordEnBase[0].mot_de_passe)
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
  }
}
