const
    express = require('express')
router = express.Router()
const { registerImage } = require('./../models/photo')

router.get('/', async (req, res, next) => {
    const { iduser } = req.session
    res.status(201).render('photo', { iduser })
})

router.post('/', async (req, res, next) => {
    const { image } = req.body
    const { iduser } = req.session
    if (!image) {
        return res.status(403).json({ 'message': 'bad input' })
    }
    const imageType = image.split(',')[0]
    if (imageType !== 'data:image/jpeg;base64') {
        return res.status(403).json({ 'message': 'bad image type' })
    }
    await registerImage(iduser, image)
    res.status(201).json({ 'message': 'success' })
})

module.exports = router
