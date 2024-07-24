import { useState } from 'react'

const Feedback = ({ onPressGood, onPressNeutral, onPressBad }) => {
  return (
    <section>
      <h1><b>give feedback</b></h1>
      <button onClick={onPressGood}>
        good
      </button>
      <button onClick={onPressNeutral}>
        neutral
      </button>
      <button onClick={onPressBad}>
        bad
      </button>
    </section>
  )
}

const Results = ({ good, neutral, bad }) => {
  return (
    <section>
      <h1><b>statistics</b></h1>
      <text>good {good}</text><br />
      <text>neutral {neutral}</text><br />
      <text>bad {bad}</text>
    </section>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function incrementGood() {
    setGood(good + 1)
  }

  function incrementNeutral() {
    setNeutral(neutral + 1)
  }

  function incrementBad() {
    setBad(bad + 1)
  }

  return (
    <>
      <Feedback onPressGood={incrementGood} onPressNeutral={incrementNeutral} onPressBad={incrementBad}/>
      <Results good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App