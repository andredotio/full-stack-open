const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body

    const userExists = await User.findOne({ username })

    if (userExists) {
        return res.status(400).json({
            error: 'username must be unique'
        })
    }

    if (!username || !password) {
        return res.status(400).json({
            error: 'both username and password are required to create a new user'
        })
    }

    if (username.length < 3 || password.length < 3) {
        return res.status(400).json({
            error: 'both username and password should be longer than 3 characters'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter