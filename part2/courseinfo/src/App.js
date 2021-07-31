import React from 'react'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  const Header = ({ course }) => {
    return (
      <>
        <h1>{course.name}</h1>
      </>
    )
  }

  const Content = ({ course }) => {
    return course.parts.map((value, id) => (
      <Part key={id} part={value.name} exercise={value.exercises} />
    ))
  }

  const Part = ({ part, exercise }) => {
    return (
      <p>
        {part} {exercise}
      </p>
    )
  }

  const Total = ({ course }) => {
    const sum = course.parts.reduce((total, part) => total + part.exercises, 0)
    return <strong>Number of exercises {sum}</strong>
  }

  const Course = ({ course }) => {
    return (
      <>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </>
    )
  }

  return (
    <>
      {courses.map((value, id) => (
        <Course key={id} course={value} />
      ))}
    </>
  )
}

export default App
