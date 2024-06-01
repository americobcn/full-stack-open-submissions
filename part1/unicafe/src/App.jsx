import { useState } from 'react'


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StaticLine text="Good" value={good} />
          <StaticLine text="Neutral" value={neutral} />
          <StaticLine text="Bad" value={bad} />
          <StaticLine text="All" value={all} />
          <StaticLine text="Average" value={average} />
          <StaticLine text="Positive" value={`${positive}%`} />
        </tbody>
      </table>
    </>
  )
}


const StaticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  console.log(good, neutral, bad)

  const handleClickGood = () => {
    const newGood = good + 1
    const newAll = newGood + bad + neutral
    const newAverage = (newGood - bad) / newAll
    const newPositive = newGood / newAll * 100
    setGood(newGood)
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }

  const handleClickNeutral = () => {
    const newNeutral = neutral + 1
    const newAll = good + newNeutral + bad
    const newPositive = good / newAll * 100
    setNeutral(newNeutral)
    setAll(newAll)
    setPositive(newPositive)
  }

  const handleClickBad = () => {
    const newBad = bad + 1
    const newAll = good + neutral + newBad
    const newAverage = (good - newBad) / newAll
    const newPositive = good / newAll * 100
    setBad(newBad)
    setAll(newAll)
    setAverage(newAverage)
    setPositive(newPositive)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <span><Button handleClick={handleClickGood} text="Good" /></span>
      <span><Button handleClick={handleClickNeutral} text="Neutral" /></span>
      <span><Button handleClick={handleClickBad} text="Bad" /></span>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}
        average={average} positive={positive} />
    </div>
  )
}

export default App