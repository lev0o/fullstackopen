import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import personsService from './services/persons'

const Persons = ({ persons, setPersons }) => {
  const handleDelete = (e, person) => {
    e.preventDefault()

    if (confirm(`Are you sure you want to delete ${person.name}?`)) {
      personsService.deletePerson(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return(
    <ul>
      {persons.map(person => <li key={person.id}>{person.name} {person.number} <button onClick={(e) => handleDelete(e, person)}>delete</button></li>)}
    </ul>
  )

  // use person.id as key for li element
}

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber, setMessage, setError }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    
    const person = persons.find(person => person.name.toUpperCase() === newName.toUpperCase())

    if (!person) {
      const newPerson = {  // Generate a new UUID for each new person
        name: newName,
        number: newNumber,
        id: uuidv4()
      }
      
      personsService.addPerson(newPerson)
        .then(newPerson => setPersons(persons.concat(newPerson)))
        .then(() => {
          setError(false)
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => setMessage(null), 5000)
        })

    } else {
      if(confirm(`${newName} has already been added. Replace the old number with a new one?`)) {
        const newPerson = {
          ...person,
          number: newNumber
        }

        personsService.updatePerson(newPerson, newPerson.id)
          .then(newPerson => {
            setPersons(persons.map(p => p.id !== newPerson.id ? p : newPerson))
          })
          .then(() => {
            setError(false)
            setMessage(`Updated ${person.name}'s number`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(() => {
            setError(true)
            setMessage(`${person.name} has already been deleted from the server`)
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(p => p.id != newPerson.id))
          })
      }
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
        number: <input value={newNumber} onChange={(e) => {setNewNumber(e.target.value)}}/>
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

const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notif' style={{color: color}}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    //console.log('effect') // this will be logged twice, because of strict mode (in main.jsx) which intentionally double-invokes certain lifecycle methods and hooks like useEffect to help developers find unexpected side effects
    
    personsService.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={error ? 'red' : 'green'} />
      <Filter searchName={searchName} setSearchName={setSearchName} />

      <h3>Add new</h3>
      <PersonForm persons={persons} newName={newName} newNumber={newNumber} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setMessage={setMessage} setError={setError} /> {/* This is terrible */}

      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase()))} setPersons={setPersons} />
    </div>
  )
}

export default App