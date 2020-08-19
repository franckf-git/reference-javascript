const knex = require('../config/db')
const message = require('../config/messages')

exports.get = async (req, res, next) => {
    const recupInfosBdd = await knex('datas').select()
    retourParser = []
    recupInfosBdd.forEach(element => {
        const datajson = JSON.parse(element.data)
        retourParser.push({
            id: element.id,
            data: datajson
        })
    })
    res.json(retourParser)
}

exports.getid = async (req, res, next) => {
    try {
        const recupInfosBddID = await knex('datas').where('id', req.params.id)
        if (recupInfosBddID[0] === undefined) {
            throw new Error
        }
        const datajson = JSON.parse(recupInfosBddID[0].data)
        res.json({
            id: req.params.id,
            data: datajson
        })
    } catch (error) {
        return res.status(404).json({
            message: `${message.idabsent} ${req.params.id}`
        })
    }
}

exports.post = async (req, res, next) => {
    try {
        if (!req.is('application/json')) {
            return res.status(406).json({
                message: `${message.mauvaisheader}`
            })
        }
        dataAEnregistrer = JSON.stringify(req.body)
        const enregistrementInfosBdd = await knex('datas').insert({
            data: dataAEnregistrer
        })
        res.json({
            id: `${enregistrementInfosBdd}`
        })
    } catch (error) {
        return res.status(501).json({
            message: `${message.imprevu}`
        })
    }
}

exports.put = async (req, res, next) => {
    try {
        const recupInfosBddID = await knex('datas').where('id', req.params.id)
        if (recupInfosBddID[0] === undefined) {
            throw new Error
        }
        if (!req.is('application/json')) {
            return res.status(406).json({
                message: `${message.mauvaisheader}`
            })
        }
        dataAEnregistrer = JSON.stringify(req.body)
        const majInfosBdd = await knex('datas').update({
            data: dataAEnregistrer
        }).where('id', req.params.id)
        res.json({
            message: `${message.majDonnees} ${req.params.id}`
        })
    } catch (error) {
        return res.status(404).json({
            message: `${message.idabsent} ${req.params.id}`
        })
    }
}

exports.del = async (req, res, next) => {
    try {
        const recupInfosBddID = await knex('datas').where('id', req.params.id)
        if (recupInfosBddID[0] === undefined) {
            throw new Error
        }
        suppressionInfosBdd = await knex('datas').del().where('id', req.params.id)
        res.json({
            message: `${message.suppressionid} ${req.params.id}`
        })
    } catch (error) {
        return res.status(404).json({
            message: `${message.idabsent} ${req.params.id}`
        })
    }
}