const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.validation = async (req, res, next) => {
    const tokenSoumis = req.headers['x-api-key']
    if (!tokenSoumis) {
        return res.status(401).json({
            message: `Le token est absent de x-api-key.`
        })
    }
    try {
        await jwt.verify(tokenSoumis, config.TOKEN_SECRET)
        return next()
    } catch (error) {
        return res.status(401).json({
            message: `Le token a été refusé : ${error}`
        })
    }
}