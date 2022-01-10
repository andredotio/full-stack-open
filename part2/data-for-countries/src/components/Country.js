import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((language, i) => 
                    <li key={i}>{language}</li>
                )}
            </ul>
            <img src={country.flag} alt={`${country.name.common} flag`}/>
            <Weather country={country} />
        </div>
    )
}

export default Country