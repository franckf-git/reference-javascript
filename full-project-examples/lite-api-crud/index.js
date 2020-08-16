const express = require('express')
const config = require('./config/config')

const server = express()

server.use(express.json())
server.use(express.urlencoded({
    extended: false
}))

server.use('/datas', require('./datas/router'))
server.use('/operateurs', require('./operateurs/router'))
server.use('/authentification', require('./authentification/router'))

server.all('/*', (req, res, next) => {
    res.json({
        message: `Bienvenue, pour plus détails, visitez : https://gitlab.com/franckf/lite-api-crud/blob/master/README.md`
    })
})

server.listen(config.PORT)