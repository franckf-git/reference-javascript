const message = require('./messages')

exports.imprevu = async (req, res, next) => {
    try {
        res.status(501).json({
            message: `${message.imprevu} Vérifiez la documentation.`
        })
    } catch (error) {
        return res.status(501).json({
            message: `${message.imprevu}`
        })
    }
}