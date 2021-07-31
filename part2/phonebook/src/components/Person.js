import React from 'react'
import dbService from '../service/dbService'

const Person = ({ person, filter, setMessage }) => {
  if (person.name.indexOf(filter) !== -1) {
    return (
      <tr id={person.id}>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)) {
                dbService
                  .remove(person.id)
                  .then((response) => {
                    setMessage({
                      text: `${person.name} has removed`,
                      type: 'success',
                    })
                    setTimeout(() => {
                      setMessage(null)
                    }, 3000)
                  })
                  .catch((err) => {
                    setMessage({
                      text: `${person.name} was already remov from server`,
                      type: 'error',
                    })
                    setTimeout(() => {
                      setMessage(null)
                    }, 3000)
                  })
              }
            }}
          >
            delete
          </button>
        </td>
      </tr>
    )
  } else {
    return <></>
  }
}

export { Person }
