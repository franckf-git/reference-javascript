const knex = require('../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const message = require('../config/messages')


exports.post = async (req, res, next) => {
    try {
        if (!req.is('application/json')) {
            return res.status(406).json({
                message: `${message.mauvaisheader}`
            })
        }

        const checkEmailExist = await knex('operateurs').where('email', req.body.email)
        if (checkEmailExist[0] === undefined) {
            return res.status(404).json({
                message: `${message.emailabsent}`
            })
        }

        const passwordEnBase = await knex('operateurs')
            .select('mot_de_passe')
            .where('email', req.body.email)
        const comparaisonPassword = await bcrypt.compare(req.body.mot_de_passe, passwordEnBase[0].mot_de_passe)
        if (comparaisonPassword) {
            const operateur = req.body.email
            const token = await jwt.sign({
                    operateur
                },
                config.TOKEN_SECRET, {
                    expiresIn: config.TOKEN_EXPIRATION
                })
            return res.status(201).json({
                message: `${message.authsuccess}`,
                token: token
            })
        } else {
            return res.status(401).json({
                message: `${message.mauvaismdp}`
            })
        }

    } catch (error) {
        return res.status(501).json({
            message: `${message.imprevu}`
        })
    }
}