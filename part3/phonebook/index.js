const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

const morgan = require('morgan')
morgan.token('body', (req) => JSON.stringify(req.body))

const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())

persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

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
    res.json(persons)
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

    const personExists = persons.find(person => person.name === req.body.name)

    if (personExists) {
        return res.status(400).json({
            error: 'person already exists'
        })
    }
    
    const newPerson = {
        name: req.body.name,
        number: req.body.number,
        id: generatedId()
    }

    persons = persons.concat(newPerson)

    res.json(newPerson)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.listen(PORT, () =>
    console.log(`The server is running at http://localhost:${PORT}`)
)