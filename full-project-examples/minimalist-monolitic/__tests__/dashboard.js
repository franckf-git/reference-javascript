const request = require('supertest')
const app = require('./../app')
const { core } = require('./../database/config')
const { createUser } = require('./../models/login')
const { getInitial, getColor } = require('./../routes/utils')

const cleanTestUser = async () => {
    await core('users').delete().where({ name: 'testauth' })
    await core('users').delete().where({ name: 'testnewuser' })
}

describe('Tests dashboard page', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('dashboard page if not auth', async () => {
        const response = await request(app).get('/dashboard')
        expect(response.statusCode).toBe(302)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/plain')
        expect(response.headers).toBeDefined()
        expect(response.headers.location).toBe('/login')
        expect(response.res.text).toBe('Found. Redirecting to /login')
    })

    test('dashboard page if auth', async () => {
        await createUser('testauth', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testauth', password: 'password' })
        const response = await request(app).get('/dashboard').set('Cookie', [post.headers['set-cookie'][0]])
        expect(response.statusCode).toBe(201)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/dashboard/)
        expect(response.text).toMatch(/newuser/)
    })

    test('logout redirect to home', async () => {
        const response = await request(app).get('/logout')
        expect(response.statusCode).toBe(302)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/plain')
        expect(response.headers).toBeDefined()
        expect(response.headers.location).toBe('/')
        expect(response.res.text).toBe('Found. Redirecting to /')
    })

    test('if new user page exist', async () => {
        await createUser('testauth', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testauth', password: 'password' })
        const response = await request(app).get('/dashboard/newuser').set('Cookie', [post.headers['set-cookie'][0]])
        expect(response.statusCode).toBe(200)
        expect(response.statusCode).not.toBe(404)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/newuser/)
    })

    test('if newuser post work', async () => {
        await createUser('testauth', 'password')
        const connect = await request(app)
            .post('/login')
            .send({ name: 'testauth', password: 'password' })
        const post = await request(app)
            .post('/dashboard/newuser')
            .set('Cookie', [connect.headers['set-cookie'][0]])
            .send({ name: 'testnewuser', password: 'password' })
        expect(post.statusCode).toBe(302)
        expect(post.type).toBe('text/plain')
        expect(post.headers).toBeDefined()
        expect(post.text).toMatch(/ok/)
    })

    test('if newuser post failed - no params', async () => {
        await createUser('testauth', 'password')
        const connect = await request(app)
            .post('/login')
            .send({ name: 'testauth', password: 'password' })
        const post = await request(app).post('/dashboard/newuser').set('Cookie', [connect.headers['set-cookie'][0]])
        expect(post.statusCode).toBe(302)
        expect(post.type).toBe('text/plain')
        expect(post.headers).toBeDefined()
        expect(post.text).toMatch(/wrong/)
    })

})

describe('Return avatar', () => {

    test('get initial from name', () => {
        expect(getInitial('Rtrete')).toBe('R')
        expect(getInitial('iiiiii')).toBe('I')
    })

    test('get color from name', async () => {
        expect(await getColor('Rtrete')).toMatch(/[0-9a-f]{6}/)
        expect(await getColor('iiiiii')).toMatch(/[0-9a-f]{6}/)
    })

})
