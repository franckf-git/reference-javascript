const path = require('path')
const vuesdudossier = path.join(__dirname, './views/')
const { creationValidateur, validationUrl } = require('./models')
const uuid = require('uuid')
require('dotenv')
  .config()

exports.source = async (req, res, next) => {
  res.render(vuesdudossier + 'index.ejs', {
    titre: 'playground'
  })
}

exports.envoivalidation = async (req, res, next) => {
  try {
    if (!req.body.email) {
      return res.status(402)
        .render(vuesdudossier + 'index.ejs', {
          titre: 'pas de mail'
        })
    }
    const uuidaValider = uuid.v4()
    await creationValidateur(req.body.email, uuidaValider)
    const urldevalidation = `http://${process.env.DOMAIN}/validation-mail/${uuidaValider}`
    res.render(vuesdudossier + 'index.ejs', {
      titre: urldevalidation
    })
  } catch (error) {
    console.error(error)
  }
}

exports.urlavalidater = async (req, res, next) => {
  try {
    const validationbdd = await validationUrl(req.params.uid)
    if (validationbdd[0] === undefined) {
      return res.status(404)
        .render(vuesdudossier + 'index.ejs', {
          titre: 'le lien de validation est invalide'
        })
    }
    res.render(vuesdudossier + 'index.ejs', {
      titre: `votre email ${validationbdd[0].email} a été confirmé`
    })
  } catch (error) {
    console.error(error)
  }
}
