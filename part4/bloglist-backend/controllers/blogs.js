const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})

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
    const newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    })

    if (!newBlog.likes) {
        newBlog.likes = 0
    }

    if (!newBlog.title || !newBlog.url) {
        res.status(400).end()
    }

    const blog = await newBlog.save()

    res.status(201).json(blog)

})

blogsRouter.put('/:id', (req, res, next) => {
    const blog = {
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    }

    Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        .then(updatedBlog => {
            res.json(updatedBlog)
        })
        .catch(error => next(error))
})

blogsRouter.delete('/:id', async (req, res, next) => {
    await Blog.findByIdAndDelete(req.params.id)

    res.status(204).end()
})

module.exports = blogsRouter