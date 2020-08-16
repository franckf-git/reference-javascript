const db = require('../../config/dbconnect')

exports.creationValidateur = async (email, uuid) => {
  try {
    await db('validmail')
      .insert({ email, uuid })
  } catch (error) {
    console.error(error)
  }
}

exports.validationUrl = async (uuid) => {
  try {

    await db('validmail')
      .where({ uuid })
      .update({ confirmer: 1 })
    return await db('validmail')
      .select('email')
      .where({ uuid })
  } catch (error) {
    console.error(error)
  }
}
