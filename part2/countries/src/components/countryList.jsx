import { useState, useEffect } from 'react';
import countryService from '../services/countryService'

const CountryData = ({ country }) => {
    const [countryData, setCountryData] = useState(null);
    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        countryService
            .getCountry(country)
            .then(data => {
                countryService
                    .getWeather(data.capitalInfo.latlng[0], data.capitalInfo.latlng[1])
                    .then(weather => {
                        setCountryData(data)
                        setWeatherData(weather)
                    })
            })
            .catch((err) => {
                console.error('Failed to fetch country/weather data:', err);
            })
    }, [country]);

  
    return ( countryData &&
        <div>
            <h1>{countryData.name.common}</h1>
            <div>
                <p>{`capital ${countryData.capital[0]}`}</p>
                <p>{`area ${countryData.area}`}</p>
            </div>
            <div>
                <strong>languages: </strong>
                <ul>
                    {Object.values(countryData.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                ))}
                </ul>
            </div>
            <img src={countryData.flags.png} alt={`${countryData.name.common} flag`} />
            <div>
                <h2>Weather in {countryData.capital[0]}</h2>
                <p>temperature {(weatherData.main.temp - 273).toFixed(2)} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                <p>wind {weatherData.wind.speed} m/s</p>
            </div>
        </div>
    );
};

const CountryList = ({ countries }) => {
    const [showList, setShowList] = useState(Array(countries.length).fill(false))

    if (!countries) { return (<div>No matching countries.</div>) }
    else if (countries.length > 10) { return (<div>Too many matches, specify another filter...</div>) }
    else if (countries.length === 1) { return (<CountryData country={countries[0]}/>) }

    return (
        <ul>
            {countries.map((country, i) => 
            <li key={country}>{country} 
                <button onClick={() => {setShowList(showList.map((element, index) => index != i ? element : !element))}}>{showList[i] ? "hide" : "show"}</button>
                {showList[i] && <CountryData country={countries[i]} />}
            </li>)}
        </ul>
    )
}

export { CountryList }