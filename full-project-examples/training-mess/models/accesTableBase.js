const db = require('../config/dbconnect')
const moment = require('../config/momentfr')

const renvoiContenuBase = async () => {
  try {
    // on recupere d abord les données sous la forme dun array/tableau avec des objects
    const recupInfosBdd = await db.select()
      .table('basedata')
      .limit(15)
      .orderBy('id', 'desc')
    // on declare un array/tableau vide pour acceuillir les données transformés
    const recupInfosBddDateOK = []
    /* pour chaque element du array/tableau contenant les données, on :
    recupere la valeur de chaque colonne à l identique, sauf pour la date de création que l'on formate avec moment
    on pousse ensuite les valeurs, sous la forme d object dans le tableau vide
    AINSI : on recreer le array/tableau avec des objects de la base de donnée avec le format de date que l'on veut
    */
    for (const ligne in recupInfosBdd) {
      const idLigne = recupInfosBdd[ligne].id
      const entreeLigne = recupInfosBdd[ligne].entree
      const createdAtTransform = moment(recupInfosBdd[ligne].created_at)
        .format('lll')
      recupInfosBddDateOK.push({
        id: idLigne,
        entree: entreeLigne,
        created_at: createdAtTransform
      })
    }
    return recupInfosBddDateOK
  } catch (error) {
    console.log(error)
  }
}

const rechercheEntree = async (recherche) => {
  try {
    const resultatsInfosBdd = await db.select()
      .table('basedata')
      .where('entree', 'like', `%${recherche}%`)
      .orderBy('id', 'desc')
    return resultatsInfosBdd
  } catch (error) {
    console.log(error)
  }
}

const enregistrementBase = async (messageASauvegarder) => {
  try {
    const insertMessageBDD = await db('basedata')
      .insert({ entree: messageASauvegarder })
    return insertMessageBDD
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  renvoiContenuBase,
  rechercheEntree,
  enregistrementBase
}
