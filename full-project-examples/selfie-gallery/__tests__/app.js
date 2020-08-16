const request = require('supertest')
const app = require('./../app')
const { core, initDatabase } = require('./../database/config')

describe('Tests static pages', () => {

    test('if index page is responding', async () => {
        const response = await request(app).get('/')
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/home/)
    })

    test('if no page return 404 error', async () => {
        const response = await request(app).get('/404')
        expect(response.statusCode).toBe(404)
        expect(response.statusCode).not.toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
    })

    test('if main CSS is OK and if length doesnt change - direct with supertest', async () => {
        return request(app)
            .get('/main.css')
            .expect('Content-Type', 'text/css; charset=UTF-8')
            .expect('Content-Length', '498')
            .expect(200)
    })

})

describe('Tests database', () => {

    test('if connect to database', async () => {
        const connect = await core.schema
        expect(core.schema.hasTable('users')).toBeDefined()
        expect(connect).toBeDefined()
    })

    test('if table users exist', async () => {
        const users = await core.schema.hasTable('users')
        expect(users).toBeDefined()
        expect(users).toBeTruthy()
    })

    test('if initialisation database exist', async () => {
        const init = await initDatabase
        expect(init).toBeDefined()
    })

})

describe('Tests handlers', () => {

    test('if ok page is responding', async () => {
        const response = await request(app).get('/ok')
        expect(response.statusCode).toBe(301)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/ok/)
    })

    test('if wrong page is responding', async () => {
        const response = await request(app).get('/wrong')
        expect(response.statusCode).toBe(301)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/wrong/)
    })

})
