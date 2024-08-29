const express = require('express')
const app = express()

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

app.get('/notes', (request, response) => {
    const d = new Date()

    response.send(`<p>Phonebook has info for ${persons.length} people</p> <p>${formatDateTime(d)}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})