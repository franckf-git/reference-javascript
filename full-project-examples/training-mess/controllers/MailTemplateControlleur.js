const { envoiMailTemplate } = require('../middlewares/envoiMailTemplate')

exports.source = async (req, res, next) => {
  res.render('mail-template-page')
}

exports.envoiMail = async (req, res, next) => {
  try {
    const utilisateur = req.body.maildedestination
    const choixTemplatesAEnvoyer = req.body.choixtemplates
    const infosMail = { utilisateur, choixTemplatesAEnvoyer }

    if (choixTemplatesAEnvoyer === undefined) {
      return res.status(400)
        .render('mail-template-page', { message: 'Il faut choisir un ou plusieurs templates' })
    }

    await envoiMailTemplate(infosMail)
    res.render('mail-template-page', { message: 'Votre mail est envoyé' })
  } catch (error) {
    console.error(error)
    res.render('mail-template-page', { message: error })
  }
}
