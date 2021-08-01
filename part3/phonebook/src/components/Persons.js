import React from 'react'
import { Person } from './Person'

const Persons = ({ persons, filter, setMessage }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            filter={filter}
            setMessage={setMessage}
          />
        ))}
      </tbody>
    </table>
  )
}

export { Persons }
