const request = require('supertest')
const app = require('./../app')
const { core } = require('./../database/config')
const { createUser } = require('./../models/login')
const { registerImage, getImages } = require('./../models/photo')

const cleanTestUser = async () => {
    await core('users').delete().where({ name: 'testphoto' })
    await core('images').delete().where({ idUser: '1234-1234' })
    await core('images').delete().where({ image: 'data:image/jpeg;base64,/9j/testpicture/9k=' })
}

describe('Tests photo page', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('photo page if not auth', async () => {
        const response = await request(app).get('/photo')
        expect(response.statusCode).toBe(302)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/plain')
        expect(response.headers).toBeDefined()
        expect(response.headers.location).toBe('/login')
        expect(response.res.text).toBe('Found. Redirecting to /login')
    })

    test('photo page if auth', async () => {
        await createUser('testphoto', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testphoto', password: 'password' })
        const response = await request(app).get('/photo').set('Cookie', [post.headers['set-cookie'][0]])
        expect(response.statusCode).toBe(201)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/photo/)
    })

    test('if post picture is ok', async () => {
        await createUser('testphoto', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testphoto', password: 'password' })
        const response = await request(app)
            .post('/photo',)
            .set('Cookie', [post.headers['set-cookie'][0]])
            .set('Accept', 'application/json')
            .send({ image: 'data:image/jpeg;base64,/9j/testpicture/9k=' })
        expect(response.statusCode).toBe(201)
        expect(response.type).toBe('application/json')
        expect(response.headers).toBeDefined()
        expect(response.text).toBe("{\"message\":\"success\"}")
    })

    test('if post picture is not ok', async () => {
        await createUser('testphoto', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testphoto', password: 'password' })
        const response = await request(app)
            .post('/photo',)
            .set('Cookie', [post.headers['set-cookie'][0]])
            .set('Accept', 'application/json')
            .send({ notimage: '---' })
        expect(response.statusCode).toBe(403)
        expect(response.type).toBe('application/json')
        expect(response.headers).toBeDefined()
        expect(response.text).toBe("{\"message\":\"bad input\"}")
    })

    test('if post picture is jpeg', async () => {
        await createUser('testphoto', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testphoto', password: 'password' })
        const response = await request(app)
            .post('/photo',)
            .set('Cookie', [post.headers['set-cookie'][0]])
            .set('Accept', 'application/json')
            .send({ image: 'data:image/png;base64,/9j/testpicture/9k=' })
        expect(response.statusCode).toBe(403)
        expect(response.type).toBe('application/json')
        expect(response.headers).toBeDefined()
        expect(response.text).toBe("{\"message\":\"bad image type\"}")
    })

})

describe('Tests gallery page', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('gallery page if not auth', async () => {
        const response = await request(app).get('/gallery')
        expect(response.statusCode).toBe(302)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/plain')
        expect(response.headers).toBeDefined()
        expect(response.headers.location).toBe('/login')
        expect(response.res.text).toBe('Found. Redirecting to /login')
    })

    test('gallery page if auth', async () => {
        await createUser('testphoto', 'password')
        const post = await request(app)
            .post('/login')
            .send({ name: 'testphoto', password: 'password' })
        const response = await request(app).get('/gallery').set('Cookie', [post.headers['set-cookie'][0]])
        expect(response.statusCode).toBe(201)
        expect(response.statusCode).not.toBe(401)
        expect(response.statusCode).not.toBe(403)
        expect(response.type).toBe('text/html')
        expect(response.headers).toBeDefined()
        expect(response.text).toMatch(/gallery/)
    })

})

describe('Models', () => {

    afterEach(() => {
        cleanTestUser()
    })

    test('if pictures are saved', async () => {
        const uuid = '1234-1234'
        const image = 'data:image/jpeg;base64,/9j/testpicture/9k='
        const request = await registerImage(uuid, image)
        expect(request).toBeDefined()
        expect(request[0]).toBeGreaterThanOrEqual(1)
    })

    test('retreving images', async () => {
        const request = await getImages()
        expect(request[0].idUser).toMatch(/[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/)
        expect(request[0].image).toMatch(/data/)
        expect(request[0].image).toMatch(/image/)
        expect(request[0].image).toMatch(/jpeg/)
        expect(request[0].image).toMatch(/base64/)
    })

})
