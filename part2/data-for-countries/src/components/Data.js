import React from 'react'
import Country from './Country'

const Data = ({ filteredCountries }) => {
    if (filteredCountries.length === 1) {
        const filteredCountry = filteredCountries[0]

        return (
            <Country country={filteredCountry} />
        )
    } else if (filteredCountries.length > 10) {
        return (
            <div>Too many matches, specify filter</div>
        )
    } else {
        return (
            <div>
                {filteredCountries.map((filteredCountry, i) =>
                    <p key={i}>{filteredCountry.name.common}</p>
                )}
            </div>
        )
    }
}

export default Data