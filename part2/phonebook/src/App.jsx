import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Names = ({ persons }) => {
  return(
    <ul>
      {persons.map(person => <li key={person.id}>{person.name}</li>)}
    </ul>
  )

  // use person.id as key for li element
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: uuidv4(), name: 'Arto Hellas' }  // Add id as field so it can be used when generating li elements
  ]) 
  const [newName, setNewName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!persons.some(person => person.name === newName)) {
      const newObject = {
        id: uuidv4(),  // Generate a new UUID for each new person
        name: newName
      }
  
      setPersons(persons.concat(newObject))
    } else {
      alert(`${newName} has already been added`)
    }

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={handleSubmit}> 
        <div>
          name: <input value={newName} onChange={(e) => {setNewName(e.target.value)}} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons} />
    </div>
  )
}

export default App