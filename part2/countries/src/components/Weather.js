import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ countries }) => {
  const [weather, setWeather] = useState([])

  const api_key = process.env.REACT_APP_API_KEY

  console.log(countries)
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${countries}`
      )
      .then((response) => {
        setWeather(response.data.current)
      })
    return () => setWeather({})
  }, [countries])

  if (weather) {
    return (
      <div>
        <h1>Weather in {countries}</h1>
        <p>temperature: {weather.temperature} Celsius</p>
        <img src={weather.weather_icons} width={50} alt="" />
        <p>
          wind: {weather.wind_speed} mph direction {weather.wind_dir}
        </p>
      </div>
    )
  }
  return <></>
}

export { Weather }
