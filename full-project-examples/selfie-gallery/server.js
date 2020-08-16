const app = require('./app')

const { initDatabase } = require('./database/config')

initDatabase()

app.listen(5500)
console.log('running')
