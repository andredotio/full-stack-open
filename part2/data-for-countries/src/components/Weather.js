import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState({})

    const api = {
        key: process.env.REACT_APP_API_KEY,
        base: 'https://api.openweathermap.org/data/2.5/'
    }

    useEffect(() => {
        axios
            .get(`${api.base}weather?q=${country.capital}&units=metric&appid=${api.key}`)
            .then(response => {
                setWeatherData(response.data)
            })
    }, [])

    if (weatherData.main !== undefined) {
        return (
            <div>
                <h2>Weather in {country.capital}</h2>
                <p>Temperature: {Math.round(weatherData.main.temp)} degrees Celsius</p>
            </div>
        )
    } else {
        return null
    }
}

export default Weather