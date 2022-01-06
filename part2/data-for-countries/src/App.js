import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Data from './components/Data'

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(
                response => {
                    setCountries(response.data)
                })
    }, [])

    const updateFilter = (event) => {
        setFilter(event.target.value)
        const filterResult = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
        setFilteredCountries(filterResult)
    }

    return (
        <div>
            <Filter handleFilter={updateFilter} />
            <Data filteredCountries={filteredCountries} />
        </div>
    )
}

export default App