require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
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

function formatDateTime(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
    const dayName = days[date.getDay()]
    const monthName = months[date.getMonth()]
    const day = date.getDate().toString().padStart(2, '0') // (for .padStart) ensures string length is at least 2, padding with '0' as needed
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

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => response.json(persons))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
    const d = new Date()

    Person.countDocuments()
        .then(count => {
            response.send(`<p>Phonebook has info for ${count} people</p> <p>${formatDateTime(d)}</p>`)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id

    Person.findByIdAndDelete(id)
        .then(deletedPerson => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    if (!request.body) return response.status(400).json({ error: 'Content missing' })

    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.status(201).json(savedPerson)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({ error: 'Person must have a name and number' })
    }

    const id = request.params.id
    const updatedPerson = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(id, updatedPerson, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).json({ error: 'Person not found' })
            }
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}
  
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
