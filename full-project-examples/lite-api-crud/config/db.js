const config = require('./config')

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: config.SQLITE_FICHIER
    },
    useNullAsDefault: true
})

module.exports = knex