import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import SearchBox from './components/searchBox'
import { CountryList } from './components/countryList'

function App() {  
  const [searchName, setSearchName] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(countries => setCountries(countries.map(country => country.name.common)))
  }, [])

  return (
    <div>
      <SearchBox searchName={searchName} setSearchName={setSearchName} /> {/* This just updates the countrylist state*/}
      {countries
        ? <CountryList countries={countries.filter(country => country.toUpperCase().includes(searchName.toUpperCase()))} /> /* Only pass the subset of countries that include the filter */
        : <p>Loading...</p>
      }
    </div>
  )
}

export default App
