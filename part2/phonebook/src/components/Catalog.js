import React from 'react'
import Entry from './Entry'

const Catalog = ({ persons, filter, filteredPersons }) => {
    if (filter !== '') {
        return (
            filteredPersons.map(filteredPerson =>
                <Entry key={filteredPerson.name} name={filteredPerson.name} phone={filteredPerson.number} />
            )
        )
    } else {
        return (
            persons.map(person =>
                <Entry key={person.name} name={person.name} phone={person.number} />
            )
        )
    }
}

export default Catalog