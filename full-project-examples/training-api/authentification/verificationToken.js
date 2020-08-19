const jwt = require('jsonwebtoken')
const config = require('../config/config')

exports.validation = async (req, res, next) => {
    const tokenSoumis = req.headers.authorization
    if (!tokenSoumis) {
        return res.status(401).json({
            message: `Le token est absent de Authorization Bearer.`
        })
    }
    try {
        const extractjwt = tokenSoumis.split(' ')
        await jwt.verify(extractjwt[1], config.TOKEN_SECRET)
        return next()
    } catch (error) {
        return res.status(401).json({
            message: `Le token a été refusé : ${error}`
        })
    }
}