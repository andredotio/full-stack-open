const mongoose = require('mongoose')
const supertest = require('supertest')
const blogHelper = require('../tests/testHelper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of blogHelper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('GET /', () => {

    test('returns a 200 status code', async () => {
        const response = await api.get('/api/blogs')

        expect(response.statusCode).toBe(200)
    }, 100000)

    test('returns blogs as json', async () => {
        const response = await api.get('/api/blogs')

        expect(response.headers['content-type'].match(/application\/json/))
    }, 100000)

    test('returns the correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(blogHelper.initialBlogs.length)
    }, 100000)

    test('verifies that each blog has a unique identifier property named "id"', async () => {
        const response = await api.get('/api/blogs')

        for (let blog of response.body) {
            expect(blog.id).toBeDefined()
        }
    }, 100000)
})

describe('GET /:id', () => {
    // todo
})

describe('POST /', () => {

    test('returns a 201 status code when a new blog is successfully created', async () => {
        const response = await api.post('/api/blogs').send({
            title: 'newTitle',
            author: 'newAuthor',
            url: 'newUrl',
            likes: 5
        })

        expect(response.statusCode).toBe(201)
    }, 100000)

    test('total number of blogs in the database is increased by 1', async () => {
        await api.post('/api/blogs').send({
            title: 'newTitle',
            author: 'newAuthor',
            url: 'newUrl',
            likes: 5
        })

        const currentBlogs = await blogHelper.blogsInDb()

        expect(currentBlogs).toHaveLength(blogHelper.initialBlogs.length + 1)
    }, 100000)

    test('"likes" property defaults to 0 if missing', async () => {
        const response = await api.post('/api/blogs').send({
            title: 'newTitle',
            author: 'newAuthor',
            url: 'newUrl'
        })

        const blog = response.body

        expect(blog.likes).toBe(0)
    }, 100000)

    test('returns a 400 status code when the "title" or "url" properties are missing', async () => {
        const response = await api.post('/api/blogs').send({
            author: 'newAuthor',
            likes: 5
        })

        expect(response.statusCode).toBe(400)
    }, 100000)
})

describe('PUT /:id', () => {
    // todo
})

describe('DELETE /:id', () => {
    // todo
})

afterAll(() => {
    mongoose.connection.close()
})
