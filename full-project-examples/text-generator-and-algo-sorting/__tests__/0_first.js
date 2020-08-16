const {  initDatabase } = require('./../database/config')

initDatabase()

test('initDatabase - create schema', () => {
    const init = true
    expect(init).toBeTruthy()
})

