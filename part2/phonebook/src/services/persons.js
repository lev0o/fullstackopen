import axios from 'axios'

const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post('http://localhost:3001/persons', newPerson)
    return request.then(response => response.data)
}

const deletePerson = personId => {
    const request = axios.delete(`http://localhost:3001/persons/${personId}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    addPerson,
    deletePerson,
}