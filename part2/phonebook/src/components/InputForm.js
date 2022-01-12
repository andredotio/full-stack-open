import React from 'react'
import Button from './Button'


const InputForm = ({ addPersons, handleNewName, handleNewNumber }) => {
    return (
        <form>
            <div>
                name <input onChange={handleNewName} />
            </div>
            <div>
                phone <input onChange={handleNewNumber} />
            </div>
            <div>
                <Button handleClick={addPersons} type='submit' text='add' />
            </div>
        </form>
    )
}

export default InputForm