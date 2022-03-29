const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)


const initialBlogs = [
    {
        title: 'title1',
        author: 'author1',
        url: 'url1',
        likes: 1
    },
    {
        title: 'title2',
        author: 'author2',
        url: 'url2',
        likes: 2
    },
    {
        title: 'title3',
        author: 'author3',
        url: 'url3',
        likes: 3
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    let blog = new Blog(initialBlogs[0])
    await blog.save()

    blog = new Blog(initialBlogs[1])
    await blog.save()

    blog = new Blog(initialBlogs[2])
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

        expect(response.body).toHaveLength(initialBlogs.length)
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
