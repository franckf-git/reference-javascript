const
    express = require('express')
router = express.Router()
const { countUsers, createUser, checkCredentials } = require('./../models/login')

router.get('/', async (req, res, next) => {
    const numbersUsers = await countUsers()
    if (numbersUsers === 0) {
        return res.render('newadmin')
    }
    res.render('login')
})

router.post('/', async (req, res, next) => {
    const { name, password } = req.body
    const testConnect = await checkCredentials(name, password)
    if (testConnect === false) {
        return res.status(403)
            .redirect('/wrong')
    }
    const iduser = testConnect
    req.session.iduser = iduser
    res.status(201).redirect('/dashboard')
})

router.post('/newadmin', async (req, res, next) => {
    const { name, password } = req.body
    try {
        await createUser(name, password)
        return res.redirect('/ok')
    } catch (error) {
        return res.status(403)
            .redirect('/wrong')
    }
})

module.exports = router
