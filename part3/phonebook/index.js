require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/person')

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/', (req, res) => {
    res.send(`<h1>This server is running on PORT ${PORT}</h1>`)
})

app.get('/info', (req, res, next) => {
    const currentDate = new Date()
    Person
        .find({})
        .then(persons => {
            res.send(`<p>Phonebook has info for ${persons.length} people</p>\n<p>${currentDate}</p>`)
        })
        .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    }

    if (!req.body.number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    }

    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })

    newPerson
        .save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const personToUpdated = {
        name: req.body.name,
        number: req.body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, personToUpdated, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(personToDelete => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
    console.log(`The server is running at http://localhost:${PORT}`)
)