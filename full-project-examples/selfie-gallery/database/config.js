const core = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './database/core.sqlite'
    },
    useNullAsDefault: true
})

const initDatabase = () => {
    core.schema.hasTable('users').then((exists) => {
        if (!exists) {
            return core.schema.createTable('users', (table) => {
                table.uuid('id')
                    .primary()
                    .unique()
                    .index()
                    .notNullable()
                table.string('name')
                    .unique()
                    .index()
                    .notNullable()
                table.string('password')
                    .notNullable()
                table.timestamp('register_at')
                    .defaultTo(core.fn.now())
                    .notNullable()
                table.timestamp('last_connect')
                    .defaultTo(core.fn.now())
                    .notNullable()
            })
        }
    })

    core.schema.hasTable('images').then((exists) => {
        if (!exists) {
            return core.schema.createTable('images', (table) => {
                table.uuid('idUser')
                    .index()
                table.foreign('idUser')
                    .references('user.id')
                table.text('image')
            })
        }
    })
}

module.exports = { core, initDatabase }

