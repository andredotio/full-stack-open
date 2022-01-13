import React, { useEffect, useState } from 'react'
import InputForm from './components/InputForm'
import Catalog from './components/Catalog'
import Filter from './components/Filter'
import personServices from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        personServices
            .getAll()
            .then(response => {
                setPersons(response)
            })
    }, [])

    const addToPhonebook = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (newName === '' || newNumber === '') {
            return
        }

        const newPersonExists = persons.some(person => person.name === newPerson.name)

        if (newPersonExists) {
            const confirmUpdate = window.confirm(`${newPerson.name} has already been added to the phonebook. Do you want to update their number ?`)

            if (confirmUpdate) {
                const person = persons.find(person => person.name === newPerson.name)
                const updatedPerson = {...person, number: newNumber}

                personServices
                    .update(updatedPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id === response.id ? response : person))
                    })
            }
        } else {
            personServices
                .create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response))
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const removeFromPhonebook = (id, name) => {
        const confirmRemoval = window.confirm(`Do you want to delete ${name} ?`)

        if (confirmRemoval) {
            personServices.remove(id)
            setPersons(persons.filter((person) => person.id !== id))
        }
    }

    const updateName = (event) => {
        setNewName(event.target.value)
    }

    const updateNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const updateFilter = (event) => {
        setFilter(event.target.value)
        const filterResult = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
        setFilteredPersons(filterResult)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter={updateFilter} />
            <h3>Add new</h3>
            <InputForm addPersons={addToPhonebook} handleNewName={updateName} handleNewNumber={updateNumber} />
            <h3>Numbers</h3>
            <Catalog persons={persons} filter={filter} filteredPersons={filteredPersons} deletePersons={removeFromPhonebook} />
        </div>
    )
}

export default App