import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

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
  const [persons, setPersons] = useState([
    { id: uuidv4(), name: 'Arto Hellas', number: '040-123456', id: 1 },
    { id: uuidv4(), name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { id: uuidv4(), name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { id: uuidv4(), name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} />

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))} />
    </div>
  )
}

export default App