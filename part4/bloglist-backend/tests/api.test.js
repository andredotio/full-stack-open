const mongoose = require('mongoose')
const supertest = require('supertest')
const blogHelper = require('../tests/testHelper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let blog = new Blog(blogHelper.initialBlogs[0])
    await blog.save()

    blog = new Blog(blogHelper.initialBlogs[1])
    await blog.save()

    blog = new Blog(blogHelper.initialBlogs[2])
    await blog.save()
})

describe('GET /', () => {

    test('returns a 200 status code', async () => {
        const response = await api.get('/api/blogs')

        expect(response.statusCode).toBe(200)
    })

    test('returns blogs as json', async () => {
        const response = await api.get('/api/blogs')

        expect(response.headers['content-type'].match(/application\/json/))
    })

    test('returns the correct amount of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(blogHelper.initialBlogs.length)
    })
})

describe('GET /:id', () => {
    // todo
})

describe('POST /', () => {
    // todo
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
