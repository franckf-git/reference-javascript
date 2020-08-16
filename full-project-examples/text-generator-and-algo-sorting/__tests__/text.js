const request = require('supertest')
const app = require('./../app')
const { core } = require('./../database/config')
const { createUser } = require('./../models/login')
const { generateText, sortingText } = require('./../routes/utils')

const cleanTestUser = async () => {
    await core('users').delete().where({ name: 'testtext' })
    await core('users').delete().where({ name: 'testnewuser' })
}

describe('Tests text page', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('text page if not auth', async () => {
        const response = await request(app).get('/text')
        expect(response.statusCode).toBe(302)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/plain')
        expect(response.headers).toBeDefined()
        expect(response.headers.location).toBe('/login')
        expect(response.res.text).toBe('Found. Redirecting to /login')
    })

    test('text page if auth', async () => {
        await createUser('testtext', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testtext', password: 'password' })
        const response = await request(app).get('/text').set('Cookie', [post.headers['set-cookie'][0]])
        expect(response.statusCode).toBe(201)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/text/)
    })

    test('text generate page if auth', async () => {
        await createUser('testtext', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testtext', password: 'password' })
        const response = await request(app).get('/text/generate.txt').set('Cookie', [post.headers['set-cookie'][0]])
        expect(response.statusCode).toBe(201)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/[0-9a-zA-Z]/)
    })

    test('if post file is ok', async () => {
        await createUser('testtext', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testtext', password: 'password' })
        const response = await request(app)
            .post('/text',)
            .set('Cookie', [post.headers['set-cookie'][0]])
            .set('Accept', 'application/json')
            .attach('resume', './__tests__/text.txt')
        expect(response.statusCode).toBe(201)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/blablabla/)
    })

})

describe('generate random text', () => {

    test('get random from utils', async () => {
        expect(await generateText()).toMatch(/[0-9a-zA-Z]/)
    })

    test('sorting text', async () => {
        expect(await sortingText('bb\na\nbbb\naa')).toBe('a\naa\nbb\nbbb')
    })

})
