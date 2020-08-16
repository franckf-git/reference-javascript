const
    express = require('express')
router = express.Router()
const { getImages } = require('./../models/photo')

router.get('/', async (req, res, next) => {
    const { iduser } = req.session
    const images = await getImages()
    res.status(201).render('gallery', { iduser, images })
})

module.exports = router
