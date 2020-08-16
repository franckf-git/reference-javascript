const
    express = require('express')
    router = express.Router()
const { searchNameFromID, createUser } = require('./../models/login')
const { getInitial, getColor } = require('./utils')

router.get('/', async (req, res, next) => {
    const { iduser } = req.session
    const username = await searchNameFromID(iduser)
    const color = await getColor(username)
    const initial = getInitial(username)
    res.status(201).render('dashboard', { initial, color })
})

router.get('/newuser', async (req, res, next) => {
    res.status(200).render('newuser')
})

router.post('/newuser', async (req, res, next) => {
    const { name, password } = req.body
    try {
        await createUser(name, password)
        return res.status(200).redirect('/ok')
    } catch (error) {
        return res.status(403)
            .redirect('/wrong')
    }
})

module.exports = router
