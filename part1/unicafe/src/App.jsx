import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Feedback = ({ onPressGood, onPressNeutral, onPressBad }) => {
  return (
    <section>
      <h1><b>give feedback</b></h1>
      <Button text="good" onClick={onPressGood}/>
      <Button text="neutral" onClick={onPressNeutral}/>
      <Button text="bad" onClick={onPressBad}/>
    </section>
  )
}

const StatisticsLine = ({ text, value, postfix }) => {
  return (
    <>
      <span>{text} {value} {postfix}</span><br />
    </>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad

  return (
    <section>
      <h1><b>statistics</b></h1>
      {all != 0 ? 
        <>
          <StatisticsLine text="good" value={good}/>
          <StatisticsLine text="neutral" value={neutral}/>
          <StatisticsLine text="bad" value={bad}/>
          <StatisticsLine text="all" value={all}/>
          <StatisticsLine text="average" value={(good - bad) / all}/>
          <StatisticsLine text="positive" value={`${(good * 100) / all} %`}/>
        </> 
        : 
        <span>No feedback given</span>
      }
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
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App