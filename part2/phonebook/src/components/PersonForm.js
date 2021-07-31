import React from 'react'
import dbService from '../service/dbService'

const PersonForm = ({
  persons,
  newName,
  newPhone,
  setPersons,
  setNewName,
  setNewPhone,
}) => {
  const Addphone = (event) => {
    event.preventDefault()

    for (let person of persons) {
      for (let name of Object.values(person)) {
        if (newName === name) {
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with a new one?`
            )
          ) {
            dbService.update(person.id, newName, newPhone)
          }
          return
        }
      }
    }

    const personsObject = {
      id: Math.random(),
      name: newName,
      number: newPhone,
    }

    dbService.create(personsObject).then((response) => {
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewPhone('')
    })
  }

  return (
    <form onSubmit={Addphone}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value)
          }}
        />
      </div>
      <div>
        number:{' '}
        <input
          value={newPhone}
          onChange={(e) => {
            setNewPhone(e.target.value)
          }}
        />
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export { PersonForm }
