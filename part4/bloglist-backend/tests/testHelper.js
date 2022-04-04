const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 0
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
    nonExistingId
}