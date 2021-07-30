import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>
}

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if ((good === 0) & (neutral === 0) & (bad === 0)) {
    return <h2>No feedback given</h2>
  }
  return (
    <table>
      <tbody>
        <tr>
          <Statistic text="good" value={good} />
        </tr>
        <tr>
          <Statistic text="neutral" value={neutral} />
        </tr>
        <tr>
          <Statistic text="bad" value={bad} />
        </tr>
        <tr>
          <Statistic text="all" value={all} />
        </tr>
        <tr>
          <Statistic text="average" value={average} />
        </tr>
        <tr>
          <Statistic text="positive" value={positive + '%'} />
        </tr>
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <td>
      {text} {value}
    </td>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = ((all - (neutral + bad)) / all) * 100

  return (
    <>
      <h1>give feedback</h1>

      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  )
}

export default App
