import React, { useEffect, useState } from 'react'
import InputForm from './components/InputForm'
import Catalog from './components/Catalog'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personServices from './services/persons'
import './index.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])
    const [message, setMessage] = useState(null)

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
                const changedPerson = { ...person, number: newNumber }

                personServices
                    .update(changedPerson)
                    .then(updatedPerson => {
                        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
                        setMessage(`${updatedPerson.name}'s number has been updated.`)
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
            }
        } else {
            personServices
                .create(newPerson)
                .then(addedPerson => {
                    setPersons(persons.concat(addedPerson))
                    setMessage(`${addedPerson.name} has been added to the phonebook.`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
        setNewName('')
        setNewNumber('')
    }

    const removeFromPhonebook = (personToRemove) => {
        const confirmRemoval = window.confirm(`Do you want to delete ${personToRemove.name} ?`)

        if (confirmRemoval) {
            personServices.remove(personToRemove.id)
            setPersons(persons.filter((person) => person.id !== personToRemove.id))
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
            <Notification message={message} />
            <Filter handleFilter={updateFilter} />
            <h3>Add new</h3>
            <InputForm addPersons={addToPhonebook} handleNewName={updateName} handleNewNumber={updateNumber} />
            <h3>Numbers</h3>
            <Catalog persons={persons} filter={filter} filteredPersons={filteredPersons} deletePersons={removeFromPhonebook} />
        </div>
    )
}

export default App