const mongoose = require('mongoose')

const MIN_ARGS = 3
const ADD_PERSON_ARGS = 5
const LIST_PERSONS_ARGS = 3

if (process.argv.length < MIN_ARGS) {
  console.log('Usage: node script.js <password> [name] [number]')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.n2qaj.mongodb.net/phoneApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

function connectToDatabase() {
  return mongoose.connect(url)
    .then(() => console.log('Connected to database'))
    .catch(error => {
      console.error('Error connecting to database:', error.message)
      process.exit(1)
    })
}

function addPerson(name, number) {
  const person = new Person({ name, number })
  return person.save()
    .then(() => console.log(`Added ${name} number ${number} to phonebook`))
}

function listPersons() {
  return Person.find({})
    .then(persons => persons.forEach(person => console.log(person)))
}

function main() {
  connectToDatabase()
    .then(() => {
      if (process.argv.length === ADD_PERSON_ARGS) {
        const [,, , name, number] = process.argv
        return addPerson(name, number)
      } else if (process.argv.length === LIST_PERSONS_ARGS) {
        return listPersons()
      } else {
        console.log('Invalid number of arguments')
        return Promise.resolve()
      }
    })
    .catch(error => console.error('An error occurred:', error.message))
    .finally(() => {
      return mongoose.connection.close()
        .then(() => console.log('Database connection closed'))
    })
}

main()