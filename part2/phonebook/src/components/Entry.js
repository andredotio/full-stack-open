import React from 'react'
import Button from './Button'

const Entry = ({ person, deletePersons }) => {
    return (
        <p>{person.name} {person.number} <Button handleClick={() => deletePersons(person.id, person.name)} text='delete' /></p>
    )
}

export default Entry