import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0,})

  console.log("selected: ", selected)
  console.log("points: ", points)

  const handleClick = () => {
    const newSelected = getRandomInt(0, anecdotes.length)
    setSelected(newSelected)
  }

  const handleVote = () => {
    const votes = { ...points }
    votes[selected] += 1
    setPoints(votes)
  }

  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
  }

  const getMostVoted = () => {
    let mostVoted = 0
    for(const p in points ) {
      if (points[p] > points[mostVoted]) {                
        mostVoted = p
      }
    }
    console.log("Most voted: ", mostVoted)
    return mostVoted
  }

  return (
    <div>
      <h3>{anecdotes[selected]}</h3>
      <p>Has {points[selected]} votes</p>
      <button onClick={handleClick}>Next anecdote</button>
      <button onClick={handleVote}>Vote</button>
      <h4>Anecdote with most votes</h4>
      <p>{anecdotes[getMostVoted()]}</p>
    </div>
  )
}

export default App