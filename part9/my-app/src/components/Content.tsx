import React from 'react'

interface ContentElement {
  name: string
  exerciseCount: number
}

const Content = ({ name, exerciseCount }: ContentElement) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  )
}

export default Content
