const { response } = require('express')
const express = require('express')
const app = express()
const PORT = 3001

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
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (res, req) => {
    const id = Number(req.params.id)
    const persons = persons.filter(person => person.id !== id)

    
})

app.listen(PORT, () =>
    console.log(`The server is running at http://localhost:${PORT}`)
)