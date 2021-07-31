import React from 'react'
import { Weather } from './Weather'

const Country = ({ countries, filter, setFilter, counter }) => {
  let countryName = ''
  const data = countries.map((element) => {
    if (
      element.name.toLowerCase().includes(filter.toLowerCase()) &&
      counter < 10
    ) {
      if (counter === 1) {
        countryName = element.name
        return [
          <div>
            <h1>{element.name}</h1>
            <p>Capital: {element.capital}</p>
            <p>Population: {element.population}</p>
            <h3>
              Languages:{' '}
              <ul>
                {element.languages.map((v) => (
                  <li key={v.name}>{v.name}</li>
                ))}
              </ul>
            </h3>
            <img src={element.flag} width={200} />
          </div>,
        ]
      } else {
        return (
          <li key={element.name}>
            {element.name}{' '}
            <button
              onClick={() => {
                setFilter(element.name)
              }}
            >
              show
            </button>
          </li>
        )
      }
    }
  })

  return (
    <>
      {data}
      {<Weather countries={countryName} />}
    </>
  )
}

export { Country }
