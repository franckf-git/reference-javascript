const request = require('supertest')
const app = require('./../app')
const {
    countUsers,
    createUser,
    checkCredentials,
    searchNameFromID,
    searchIDFromName } = require('./../models/login')
const { core } = require('./../database/config')

const cleanTestUser = async () => {
    const request = await core('users').delete().where({ name: 'testuser' })
    return request
}

describe('Tests login page', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('if login page is responding', async () => {
        const response = await request(app).get('/login')
        expect(response.statusCode).toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/login/)
    })

    test('if connect login work', async () => {
        await createUser('testuser', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testuser', password: 'password' })
        expect(post.statusCode).toBe(302)
        expect(post.statusCode).not.toBe(401)
        expect(post.statusCode).not.toBe(403)
        expect(post.type).toBe('text/plain')
        expect(post.headers).toBeDefined()
        expect(post.headers.location).toBe('/dashboard')
        expect(post.res.text).toBe('Found. Redirecting to /dashboard')
    })

    test('if connect login failed', async () => {
        await createUser('testuser', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testuser', password: 'badpassword' })
        expect(post.statusCode).toBe(302)
        expect(post.type).toBe('text/plain')
        expect(post.headers).toBeDefined()
        expect(post.text).toMatch(/wrong/)
    })

    test('create new user', async () => {
        const request = await createUser('testuser', 'password')
        expect(request).toBeDefined()
        expect(request[0]).toBeGreaterThanOrEqual(1)
    })

    test('if newadmin post work', async () => {
        const post = await request(app)
            .post('/login/newadmin')
            .send({ name: 'testuser', password: 'password' })
        expect(post.statusCode).toBe(302)
        expect(post.type).toBe('text/plain')
        expect(post.headers).toBeDefined()
        expect(post.text).toMatch(/ok/)
    })

    test('if newadmin post failed - no params', async () => {
        const post = await request(app)
            .post('/login/newadmin')
        expect(post.statusCode).toBe(302)
        expect(post.type).toBe('text/plain')
        expect(post.headers).toBeDefined()
        expect(post.text).toMatch(/wrong/)
    })

})

describe('Models', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('if users are numbers', async () => {
        const request = await countUsers()
        expect(request).toBeGreaterThanOrEqual(0)
    })

    test('if credentiels works', async () => {
        await createUser('testuser', 'password')
        const request = await checkCredentials('testuser', 'password')
        expect(request).toMatch(/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/)
    })

    test('if credentiels do not works', async () => {
        await createUser('testuser', 'password')
        const request = await checkCredentials('testuser', 'badpassword')
        expect(request).toBeFalsy()
    })

    test('if search user works', async () => {
        await createUser('testuser', 'password')
        const id = await searchIDFromName('testuser')
        const request = await searchNameFromID(id)
        expect(request).toBe('testuser')
    })

    test('if search user do not works', async () => {
        const request = await searchNameFromID('0')
        expect(request).toBeFalsy()
    })

})
