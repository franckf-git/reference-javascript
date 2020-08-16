const nodeMailer = require('nodemailer')
require('dotenv')
  .config()

exports.envoi = async (objectform) => {
  const maildedestination = objectform.maildedestination
  const textepourmail = objectform.textepourmail

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
    /*
    declarer le mail
    */
    const mailretour = process.env.MAILUSER
    const mailOptions = {
      from: `Serveur de test <${mailretour}>`,
      to: maildedestination,
      subject: 'Object vide',
      // fonctionne avec html
      text: textepourmail,
      html: textepourmail
    }

    /*
    envoi du mail
    */
    await transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        throw error
      }
    })
  } catch (error) {
    console.log(error)
  }
}
