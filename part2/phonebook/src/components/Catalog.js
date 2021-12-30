import React from 'react'
import Entry from './Entry'

const Catalog = ({ persons, filter, filteredPersons }) => {
    if (filter !== '') {
        return (
            filteredPersons.map(filteredPerson =>
                <Entry key={filteredPerson.name} name={filteredPerson.name} number={filteredPerson.number} />
            )
        )
    } else {
        return (
            persons.map(person =>
                <Entry key={person.name} name={person.name} number={person.number} />
            )
        )
    }
}

export default Catalog