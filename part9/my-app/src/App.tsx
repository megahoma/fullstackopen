import React from 'react'

import Content from './components/Content'
import Header from './components/Header'
import Total from './components/Total'

import { CoursePart } from './types'

const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts: CoursePart[] = [
    {
      id: 1,
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      id: 2,
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      id: 3,
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      id: 4,
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
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
