import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputForm from './components/InputForm'
import Catalog from './components/Catalog'
import Filter from './components/Filter'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [filteredPersons, setFilteredPersons] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log(response.data)
                setPersons(response.data)
            })
    }, [])

    const addToPhonebook = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1
        }

        if (newName === '' || newNumber === '') {
            return
        }

        const newPersonExists = persons.some(person => person.name === newPerson.name)

        if (newPersonExists) {
            alert(`${newPerson.name} has already been added to the phonebook`)
            return
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
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
            <InputForm handlePersons={addToPhonebook} handleNewName={updateName} handleNewNumber={updateNumber} />
            <h3>Numbers</h3>
            <Catalog persons={persons} filter={filter} filteredPersons={filteredPersons}/>
        </div>
    )
}

export default App