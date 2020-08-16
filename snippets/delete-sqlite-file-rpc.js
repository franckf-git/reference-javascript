const
    express = require('express')
router = express.Router()
fs = require('fs')

router.post('/deleteDatabase', async (req, res, next) => {
    try {
        await fs.unlinkSync('./database/core.sqlite')
        return res.status(202).json({ 'message': 'database deleted' })
    } catch (error) {
        console.error(error)
        return res.status(502).json({ 'message': 'something wrong' })
    }
})

module.exports = router
