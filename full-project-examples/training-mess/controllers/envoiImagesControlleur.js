const { receptionfichier } = require('../middlewares/envoiimages/avecmulter')
var path = require('path')
var fs = require('fs')

exports.source = async (req, res, next) => {
  const dossierImages = path.join(__dirname, '../public/stockage/')
  const lesfichiersenvoyés = await fs.readdirSync(dossierImages)
  res.render('envoi-images-page', { lesfichiersenvoyés })
}

exports.retourUpload = async (req, res, next) => {
  await receptionfichier(req, res, (erreurmulter) => {
    if (erreurmulter) {
      return res.render('envoi-images-page', { message: erreurmulter })
    }
    if (req.file === undefined) {
      return res.render('envoi-images-page', { message: 'pas fichier - pas de chocolat' })
    }
    res.render('envoi-images-page', { message: 'fichier envoyé' })
  })
}
