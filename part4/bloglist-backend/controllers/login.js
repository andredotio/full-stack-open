const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    const isPasswordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if (!(user && isPasswordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(
        userForToken, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h'}
    )

    res.status(200).send({
        token,
        username: user.username,
        name: user.name
    })
})

module.exports = loginRouter