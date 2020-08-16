const nodeMailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')
require('dotenv')
  .config()

exports.envoiMailTemplate = async (infosMail) => {
  const utilisateur = infosMail.utilisateur
  const choixTemplatesAEnvoyer = infosMail.choixTemplatesAEnvoyer

  try {
    /*
    declarer le server mail
    */
    const transporter = nodeMailer.createTransport({
      host: process.env.SMTP,
      port: process.env.SMTPPORT,
      secure: true,
      auth: {
        user: process.env.MAILUSER,
        pass: process.env.MAILPASS
      }
    })

    choixTemplatesAEnvoyer.forEach(async template => {
      const fichierDeTemplate = path.join(__dirname, `../views/templates-mails/oxygen/${template}.ejs`)
      const mailAEnvoyer = await ejs.renderFile(fichierDeTemplate, { utilisateur })
      /*
      declarer le mail
      */
      const mailretour = process.env.MAILUSER
      const mailOptions = {
        from: `Template mailer <${mailretour}>`,
        to: utilisateur,
        subject: `${template}`,
        // fonctionne avec html
        html: mailAEnvoyer
      }

      /*
      envoi du mail
      */
      await transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          throw error
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
