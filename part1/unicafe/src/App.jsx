import { useState } from 'react'


const Button = (props) => {
  console.log(props)
  const { handleClick, text } = props

  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log(good, neutral, bad)

  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <span><Button handleClick={handleClickGood} text="Good" /></span>
      <span><Button handleClick={handleClickNeutral} text="Neutral" /></span>
      <span><Button handleClick={handleClickBad} text="Bad" /></span>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App