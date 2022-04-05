const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const blogHelper = require('../tests/testHelper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { get } = require('../app')

const api = supertest(app)

describe('testing /api/blogs', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})

        await Blog.insertMany(blogHelper.initialBlogs)
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

        test('returns a 200 status code when the "likes" of a blog are successfully updated', async () => {
            const currentBlogs = await blogHelper.blogsInDb()
            const blogToUpdate = currentBlogs[0]

            const newBlog = { ...blogToUpdate, likes: 100 }

            const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)

            expect(response.statusCode).toBe(200)
        }, 100000)

        test('verifies that the "likes" of a blog have been successfully updated', async () => {
            const blogsBeforeUpdate = await blogHelper.blogsInDb()
            const blogToUpdate = blogsBeforeUpdate[0]
            const newBlog = { ...blogToUpdate, likes: 100 }

            await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)

            const blogsAfterUpdate = await blogHelper.blogsInDb()
            const updatedBlog = blogsAfterUpdate.filter(blog => blog.id === blogToUpdate.id)[0]

            expect(updatedBlog.likes).toBe(newBlog.likes)
        }, 100000)
    })

    describe('DELETE /:id', () => {

        test('returns a 204 status code when a blog is successfully deleted', async () => {
            const blogsBeforeDeletion = await blogHelper.blogsInDb()
            const blogToDelete = blogsBeforeDeletion[0]

            const response = await api.delete(`/api/blogs/${blogToDelete.id}`)

            expect(response.statusCode).toBe(204)
        }, 100000)

        test('total number of blogs in the database is decreased by 1', async () => {
            const blogsBeforeDeletion = await blogHelper.blogsInDb()
            const blogToDelete = blogsBeforeDeletion[0]

            await api.delete(`/api/blogs/${blogToDelete.id}`)

            const blogsAfterDeletion = await blogHelper.blogsInDb()

            expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)
        }, 100000)
    })
})

describe('testing /api/users', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    describe('GET /', () => {

        test('returns a 200 status code', async () => {
            const response = await api.get('/api/users')

            expect(response.statusCode).toBe(200)
        })

        test('returns users as json', async () => {
            const response = await api.get('/api/users')

            expect(response.headers['content-type'].match(/application\/json/))
        })

        test('returns the correct amount of users', async () => {
            const currentUsers = await blogHelper.usersInDb()
            
            const response = await api.get('/api/users')

            expect(response.body).toHaveLength(currentUsers.length)
        })
    })

    describe('POST /', () => {

        test('returns a 201 status code after a new user is a successfully created', async () => {
            const response = await api.post('/api/users').send({
                username: 'test',
                name: 'Test Test',
                password: 'testpass'
            })

            expect(response.statusCode).toBe(201)
        })

        test('total number of users in the database is increased by 1', async () => {
            const usersAtStart = await blogHelper.usersInDb()

            await api.post('/api/users').send({
                username: 'test',
                name: 'Test Test',
                password: 'testpass'
            })

            const usersAtEnd = await blogHelper.usersInDb()

            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        })

        test('verifies that the new user exists in the database', async () => {
            await api.post('/api/users').send({
                username: 'test',
                name: 'Test Test',
                password: 'testpass'
            })

            const currentUsers = await blogHelper.usersInDb()
            const usernames = currentUsers.map(user => user.username)

            expect(usernames).toContain('test')
        })

        test('returns a 400 status code if a username already exists', async () => {
            const usersAtStart = await blogHelper.usersInDb()

            const response = await api.post('/api/users').send({
                username: 'root',
                name: 'Test Test',
                password: 'testpass'
            })

            const usersAtEnd = await blogHelper.usersInDb()

            expect(response.statusCode).toBe(400)
            expect(usersAtEnd).toEqual(usersAtStart)

        })

        test('returns a 400 status code if the username or the password are missing', async () => {
            const usersAtStart = await blogHelper.usersInDb()

            const response = await api.post('/api/users').send({ name: 'Test test' })

            const usersAtEnd = await blogHelper.usersInDb()

            expect(response.statusCode).toBe(400)
            expect(response.body.username).toBe(undefined)
            expect(response.body.password).toBe(undefined)
            expect(usersAtEnd).toEqual(usersAtStart)
        })

        test('returns a 400 status code if the username or the password are not at least 3 characters long', async () => {
            const usersAtStart = await blogHelper.usersInDb()

            const response = await api.post('/api/users').send({
                username: 'te',
                name: 'Test test',
                password: 'te'
            })

            const usersAtEnd = await blogHelper.usersInDb()

            expect(response.statusCode).toBe(400)
            expect(usersAtEnd).toEqual(usersAtStart)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})
