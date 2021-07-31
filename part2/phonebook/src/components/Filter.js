import React from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      filter:
      <input
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value)
        }}
      />
    </div>
  )
}

export { Filter }
