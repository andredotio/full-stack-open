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


const generatedId = () => {
    const MAX = 999999999
    return Math.floor(Math.random() * MAX)
}

app.get('/', (req, res) => {
    res.send(`<h1>This server is running on PORT ${PORT}</h1>`)
})

app.get('/info', (req, res) => {
    const currentDate = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>\n<p>${currentDate}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons)
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const personToGet = persons.find(person => person.id === id)

    if (personToGet) {
        res.json(personToGet)
    } else {
        res.status(404).end()
    }
})

app.post('/api/persons', (req, res) => {
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

    // const personExists = persons.find(person => person.name === req.body.name)

    // if (personExists) {
    //     return res.status(400).json({
    //         error: 'person already exists'
    //     })
    // }

    const newPerson = new Person({
        name: req.body.name,
        number: req.body.number
    })

    newPerson
        .save()
        .then(savedPerson => {
            res.json(savedPerson)
        })
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () =>
    console.log(`The server is running at http://localhost:${PORT}`)
)