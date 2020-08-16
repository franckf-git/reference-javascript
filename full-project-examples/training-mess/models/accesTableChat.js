const db = require('../config/dbconnect')

exports.enregistrementMessage = async (utilisateur, infosASauvegarder) => {
  try {
    await db('chat_table')
      .insert({
        iduser: utilisateur,
        message: infosASauvegarder.message
      })
  } catch (error) {
    console.error(error)
  }
}

exports.listeMessages = async () => {
  try {
    const messages = await db.from('chat_table')
      .innerJoin('table_authsession', 'chat_table.iduser', 'table_authsession.id')
    return messages
  } catch (error) {
    console.error(error)
  }
}
