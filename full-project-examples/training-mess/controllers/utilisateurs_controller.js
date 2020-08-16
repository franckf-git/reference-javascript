'use strict'

const { Utilisateurs } = require('../models/accesUtilisateurs')

exports.liste = async (req, res, next) => {
  try {
    const tables = await new Utilisateurs(req.body)
      .listeTous()

    res.render('listeutilisateurs-page', { title: 'Liste des utilisateurs', tables })
  } catch (error) {
    console.error(error)
  }
}

exports.suppression = async (req, res, next) => {
  try {
    const idUtilisateurASupp = req.params.id
    const suppresionUnUtilisateur = new Utilisateurs(req.body)
    await suppresionUnUtilisateur.suppressionUnique(idUtilisateurASupp)

    res.redirect('/utilisateurs/liste')
  } catch (error) {
    console.error(error)
  }
}
