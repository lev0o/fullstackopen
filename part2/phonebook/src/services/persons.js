import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const deletePerson = personId => {
    const request = axios.delete(`${baseUrl}/${personId}`)
    return request.then(response => response.data)
}

const updatePerson = (newPerson, personId) => {
    const request = axios.put(`${baseUrl}/${personId}`, newPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    addPerson,
    deletePerson,
    updatePerson
}