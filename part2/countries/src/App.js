import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((respond) => {
      setCountries(respond.data)
    })
  }, [])

  return (
    <div>
      <h1>Countries:</h1>
      <Search countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App
