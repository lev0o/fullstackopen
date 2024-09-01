const express = require('express')
const morgan = require('morgan')
const app = express()

app.use((req, res, next) => { // Capture the response of the json result
    const oldJson = res.json
    res.json = function (body) {
      res.locals.body = body
      return oldJson.call(this, body)
    }
    next()
})

morgan.token('response-body', (req, res) => {
    return JSON.stringify(res.locals.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response-body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

function formatDateTime(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
    const dayName = days[date.getDay()]
    const monthName = months[date.getMonth()]
    const day = date.getDate().toString().padStart(2, '0') // (for .padStart) ensures string length is atleast 2, padding with '0' as needed
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
  
    const timeZoneOffset = -date.getTimezoneOffset()
    const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60).toString().padStart(2, '0')
    const offsetMinutes = (Math.abs(timeZoneOffset) % 60).toString().padStart(2, '0')
    const offsetSign = timeZoneOffset >= 0 ? '+' : '-'
  
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
  
    return `${dayName} ${monthName} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${offsetSign}${offsetHours}${offsetMinutes} (${timeZoneName})`
}

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/notes', (request, response) => {
    const d = new Date()

    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${formatDateTime(d)}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    if (!request.body) return response.status(400).json({error: 'Content missing'})

    const person = request.body
    person.id = Math.floor(Math.random() * 1000)

    if (!(person.name && person.number)) return response.status(400).json({error: 'Person must have a name and number'})
    if (persons.find(p => p.name === person.name)) return response.status(400).json({error: 'Name already exists'})

    persons.push(person)
    response.status(201).json(person)
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}
  
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})