import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post('http://localhost:3001/persons', newPerson)
    return request.then(response => response.data)
}

export default {
    addPerson,
    getAll
}