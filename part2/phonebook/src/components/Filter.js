import React from 'react'

const Filter = ({ handleFilter }) => {
    return (
        <form>
            <div>
                search for <input onChange={handleFilter} />
            </div>
        </form>
    )
}

export default Filter