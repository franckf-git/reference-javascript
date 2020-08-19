const knex = require('../config/db')
const bcrypt = require('bcrypt')
const message = require('../config/messages')
const jwt = require('jsonwebtoken')

exports.get = async (req, res, next) => {
    const recupInfosBdd = await knex('operateurs').select()
    res.json(recupInfosBdd)
}

exports.getid = async (req, res, next) => {
    try {
        const recupInfosBddID = await knex('operateurs').where('id', req.params.id)
        if (recupInfosBddID[0] === undefined) {
            throw new Error
        }
        res.json(recupInfosBddID)
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

        if (!req.body.email || !req.body.mot_de_passe) {
            throw new Error
        }

        const checkEmailExistant = await knex('operateurs').select().where('email', req.body.email)
        if (checkEmailExistant[0] !== undefined) {
            return res.status(409).json({
                message: `${message.emailexistant}`
            })
        }

        const mot_de_passeHash = await bcrypt.hash(req.body.mot_de_passe, 12)

        const enregistrementInfosBdd = await knex('operateurs').insert({
            email: req.body.email,
            mot_de_passe: mot_de_passeHash
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
        const recupInfosBddID = await knex('operateurs').where('id', req.params.id)
        if (recupInfosBddID[0] === undefined) {
            throw new Error
        }

        if (!req.is('application/json')) {
            return res.status(406).json({
                message: `${message.mauvaisheader}`
            })
        }

        if (!req.body.email || !req.body.mot_de_passe) {
            return res.status(501).json({
                message: `${message.imprevu}`
            })
        }

        const token = req.headers.authorization
        const extractjwt = token.split(' ')
        const decoded = jwt.decode(extractjwt[1])
        const emailtoken = decoded.operateur
        const emailenbase = await knex('operateurs').select('email').where('id', req.params.id)
        if (emailenbase[0].email !== emailtoken) {
            return res.status(403).json({
                message: `${message.droitsinsuffisants}`
            })
        }

        const mot_de_passeHash = await bcrypt.hash(req.body.mot_de_passe, 12)

        await knex('operateurs').update({
            email: req.body.email,
            mot_de_passe: mot_de_passeHash
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
        const recupInfosBddID = await knex('operateurs').where('id', req.params.id)
        if (recupInfosBddID[0] === undefined) {
            throw new Error
        }

        const token = req.headers.authorization
        const extractjwt = token.split(' ')
        const decoded = jwt.decode(extractjwt[1])
        const emailtoken = decoded.operateur
        const emailenbase = await knex('operateurs').select('email').where('id', req.params.id)
        if (emailenbase[0].email !== emailtoken) {
            return res.status(403).json({
                message: `${message.droitsinsuffisants}`
            })
        }

        suppressionInfosBdd = await knex('operateurs').del().where('id', req.params.id)
        res.json({
            message: `${message.suppressionid} ${req.params.id}`
        })
    } catch (error) {
        return res.status(404).json({
            message: `${message.idabsent} ${req.params.id}`
        })
    }
}