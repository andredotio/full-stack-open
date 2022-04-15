const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// const getToken = (req) => {
//     const authorization = req.get('authorization')

//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }

//     return null
// }

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    res.json(blogs)
})

blogsRouter.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then(blog => {
            if (blog) {
                res.json(blog)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', async (req, res, next) => {

    const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ 
            error: 'invalid or missing token' 
        })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        user: user.id
    })

    if (!newBlog.likes) {
        newBlog.likes = 0
    }

    if (!newBlog.title || !newBlog.url) {
        res.status(400).end()
    }

    const blog = await newBlog.save()
    user.blogs = user.blogs.concat(blog.id)
    await user.save()

    res.status(201).json(blog)
})

blogsRouter.put('/:id', async (req, res, next) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })

    res.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).end()
})

module.exports = blogsRouter