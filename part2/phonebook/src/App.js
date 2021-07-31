import React, { useState, useEffect } from 'react'

import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Notification } from './components/Notification'

import dbService from './service/dbService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    dbService.getAll().then((response) => setPersons(response.data.persons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        newName={newName}
        newPhone={newPhone}
        setPersons={setPersons}
        setNewName={setNewName}
        setNewPhone={setNewPhone}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setMessage={setMessage} />
    </div>
  )
}

export default App
