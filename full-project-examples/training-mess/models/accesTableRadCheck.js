const db = require('../config/dbconnect')

const renvoiContenuTable = async () => {
  try {
    const idconfig = 1
    const verifIdExistant = db('save_radcheck')
      .select()
      .where({ id: idconfig })
      .then(exist => {
        return exist
      })

    if ((await verifIdExistant)
      .length === 0) {
      await db('save_radcheck')
        .insert({ id: idconfig, objetdelapage: '{}' })
        .then(ajout => {
          return ajout
        })
    }

    const envoiConfig = await db('save_radcheck')
      .select('objetdelapage')
      .where({ id: idconfig })
    return envoiConfig
  } catch (error) {
    console.log(error)
  }
}

const enregistrementTable = async (configASauvegarder) => {
  try {
    const idconfig = 1
    const verifIdExistant = db('save_radcheck')
      .select()
      .where({ id: idconfig })
      .then(exist => {
        return exist
      })

    if ((await verifIdExistant)
      .length === 0) {
      await db('save_radcheck')
        .insert({ id: idconfig, objetdelapage: '{}' })
        .then(ajout => {
          return ajout
        })
    }

    const miseAJour = await db('save_radcheck')
      .where({ id: idconfig })
      .update({ objetdelapage: `${JSON.stringify(configASauvegarder)}`, date_update: db.fn.now() })
    return miseAJour
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  renvoiContenuTable,
  enregistrementTable
}
