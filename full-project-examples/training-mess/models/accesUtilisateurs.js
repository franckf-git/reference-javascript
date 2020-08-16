'use strict'

const db = require('../config/dbconnect')
const uuid = require('uuid')

class Utilisateurs {
  constructor(infosUtilisateurs) {
    this.email = infosUtilisateurs.inputEmail4
    this.motdepasse_enclair_BAD = infosUtilisateurs.inputPassword4
    this.adresse_partie1 = infosUtilisateurs.inputAddress1
    this.adresse_partie2 = infosUtilisateurs.inputAddress2
    this.ville = infosUtilisateurs.inputCity
    this.departement = infosUtilisateurs.inputState
    this.codepostal = infosUtilisateurs.inputZip
    this.identifiantclient = uuid.v4()
    this.administrateur = infosUtilisateurs.gridCheck
  }

  async creation () {
    try {
      const admin = () => {
        if (this.administrateur === 'on') {
          return 1
        } else {
          return 0
        }
      }
      await db('table_utilisateurs')
        .insert({
          email: this.email,
          motdepasse_enclair_BAD: this.motdepasse_enclair_BAD,
          adresse_partie1: this.adresse_partie1,
          adresse_partie2: this.adresse_partie2,
          ville: this.ville,
          departement: this.departement,
          code_postal: this.codepostal,
          identifiantclient: this.identifiantclient,
          administrateur: admin()
        })
    } catch (error) {
      console.error(error)
    }
  }

  async listeTous () {
    try {
      const tables = await db('table_utilisateurs')
        .select()
      return tables
    } catch (error) {
      console.error(error)
    }
  }

  async listePays () {
    try {
      const tables = await db('table_utilisateurs')
        .select('departement')
        .distinct()
        .orderBy('departement')
      return tables
    } catch (error) {
      console.error(error)
    }
  }

  async suppressionUnique (idUtilisateurASupp) {
    try {
      await db('table_utilisateurs')
        .delete()
        .where({ id: idUtilisateurASupp })
    } catch (error) {
      console.error(error)
    }
  }

  async suppressionRGDP () {
    try {
      const dateDeSupp = new Date(new Date()
        .setMonth(new Date()
          .getMonth() - 6))

      await db('table_utilisateurs')
        .delete()
        .where('derniere_modification', '<', dateDeSupp)
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = { Utilisateurs }
