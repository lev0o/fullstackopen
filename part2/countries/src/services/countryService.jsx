import axios from 'axios'

const API_KEY = import.meta.env.VITE_WEATHER_KEY // This should be stored as an environment variable

const getAll = () => {
    const request = axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    return request.then(response => response.data)
}

const getCountry = name => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    return request.then(response => response.data)
}

const getWeather = (lat, lon) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    getCountry,
    getWeather
}