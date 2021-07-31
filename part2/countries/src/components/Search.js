import React from 'react'
import { Country } from './Country'

const SearchFilter = ({ countries, filter, setFilter }) => {
  let counter = 0
  countries.map((v) => {
    if (v.name.toLowerCase().includes(filter.toLowerCase())) {
      counter++
    }
  })

  const helper = () => {
    if (counter > 10 && filter.length > 0) {
      return <h3>Too many matches, specify another filter</h3>
    }
  }

  return (
    <div>
      find:
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value)
        }}
      />
      {helper()}
      <Country
        countries={countries}
        filter={filter}
        setFilter={setFilter}
        counter={counter}
      />
    </div>
  )
}

export default SearchFilter
