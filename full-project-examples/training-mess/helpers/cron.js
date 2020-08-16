const { CronJob } = require('cron')
const { Utilisateurs } = require('../models/accesUtilisateurs')

exports.startCron = () => {
  const job = new CronJob('0 0 0 * * *', () => {
    const utilisateur = new Utilisateurs('')
    utilisateur.suppressionRGDP()
  })
  job.start()
}
