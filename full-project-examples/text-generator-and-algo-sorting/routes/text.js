const
    express = require('express')
router = express.Router()
multer = require('multer')
upload = multer()
const { generateText, sortingText } = require('./utils')

router.get('/', async (req, res, next) => {
    const { iduser } = req.session
    res.status(201).render('text', { iduser })
})

router.get('/generate.txt', async (req, res, next) => {
    const text = await generateText()
    res.status(201).send(text)
})

router.post('/', upload.single('resume'), async (req, res, next) => {
    const fileContent = await req.file.buffer.toString('utf8')
    const sortingFileContent = await sortingText(fileContent)
    res.status(201).send(sortingFileContent)
})

module.exports = router
