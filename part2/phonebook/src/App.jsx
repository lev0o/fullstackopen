import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

const Persons = ({ persons }) => {
  return(
    <ul>
      {persons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
    </ul>
  )

  // use person.id as key for li element
}

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!persons.some(person => person.name === newName)) {
      const newObject = {
        id: uuidv4(),  // Generate a new UUID for each new person
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(newObject))
    } else {
      alert(`${newName} has already been added`)
    }

    setNewName('')
    setNewNumber('')
  }

  return(
    <form onSubmit={handleSubmit}> 
      <div>
        name: <input type="text" value={newName} onChange={(e) => {setNewName(e.target.value)}} />
      </div>
      <div>
        number: <input type="number" value={newNumber} onChange={(e) => {setNewNumber(e.target.value)}}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ searchName, setSearchName }) => {
  return(
    <div>
      Filter names: <input type="text" value={searchName} onChange={(e) => {setSearchName(e.target.value)}}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    //console.log('effect') // this will be logged twice, because of strict mode (in main.jsx) which intentionally double-invokes certain lifecycle methods and hooks like useEffect to help developers find unexpected side effects
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        //console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} /> {/* This is terrible */}

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))} />
    </div>
  )
}

export default App