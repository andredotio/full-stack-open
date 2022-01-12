import React from 'react'
import Entry from './Entry'

const Catalog = ({ persons, filter, filteredPersons, deletePersons }) => {
    if (filter !== '') {
        return (
            filteredPersons.map((filteredPerson, i) =>
                <Entry key={i} person={filteredPerson} deletePersons={deletePersons} />
            )
        )
    } else {
        return (
            persons.map((person, i) =>
                <Entry key={i} person={person} deletePersons={deletePersons} />
            )
        )
    }
}

export default Catalog