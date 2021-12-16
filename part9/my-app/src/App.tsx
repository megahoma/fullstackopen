import React from 'react'

import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      id: 1,
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      id: 2,
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      id: 3,
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  return (
    <div>
      <Header courseName={courseName} />
      {courseParts.map((el) => (
        <Content key={el.id} name={el.name} exerciseCount={el.exerciseCount} />
      ))}
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
