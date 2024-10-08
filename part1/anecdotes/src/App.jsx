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
  const [max, setMax] = useState(0) 
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const handleNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteIncrement = () => {
    const copy = [...points]
    copy[selected] += 1
    if(copy[selected] > copy[max]) 
      setMax(selected)
    setPoints(copy)
  }

  return (
    <div>
      <section>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}<br />
        has {points[selected]} votes<br />
        <button onClick={handleVoteIncrement}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </section>
      <section>
        <h1>Anecdote with the most votes</h1>
        {anecdotes[max]}<br />
        has {points[max]} votes<br />
      </section>
    </div>
  )
}

export default App