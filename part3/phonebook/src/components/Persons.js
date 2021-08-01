import React from 'react'
import { Person } from './Person'

const Persons = ({ persons, filter, setMessage, setPersons }) => {
  return (
    <table>
      <tbody>
        {persons.map((person) => (
          <Person
            key={person.id}
            person={person}
            filter={filter}
            setMessage={setMessage}
            setPersons={setPersons}
          />
        ))}
      </tbody>
    </table>
  )
}

export { Persons }
