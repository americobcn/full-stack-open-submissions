import { useState, useEffect } from "react"
import countriesServices from "./services/countries"

const Countries = ({ filtered, handleShowButton }) => {
  if (filtered.length === 0) {
    return <></>
  }

  if (filtered.length > 10) {
    return <p>Too many countries</p>
  }

  if (filtered.length > 1 && filtered.length < 10 ) {
    return (
      <ul>
        {filtered.map(c => 
        <li key={c.name.official}>{c.name.official}
        <button onClick={() => handleShowButton(c)} className="show">Show</button>
        </li>)}
      </ul>
    )
  }

  return (<Countrie countrie={filtered[0]} />)
}

const Countrie = ({countrie}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesServices
      .getWeather(countrie.latlng[0], countrie.latlng[1])
      .then(data => setWeather(data))
  }, [])

  const languages = []
  for (const key in countrie.languages) {
    languages.push(countrie.languages[key])
  }

  return (
    <div className="countrie"> 
      <h3>{countrie.name.official}</h3>
      <p>Capital: {countrie.capital}</p>
      <p>Area: {countrie.area}</p>
      <h4>Languages</h4>
      <ul>
        {languages.map(l => <li key={l}>{l}</li>)}
      </ul>
      <h5>Flag</h5>
      <img src={countrie.flags.png} className="flag"></img>
      <h3>Weather in {countrie.capital}</h3>
      <p>Temp: {weather !== null ? weather.main.temp : "--"} Celsius</p>
      <img src={weather !== null ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` : null}></img>
      <p>Wind: {weather !== null ? weather.wind.speed : "--"} m/s</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  

  useEffect(() => {
    countriesServices
      .getAllCountries()
      .then(data => setCountries(data))
  }, [])

  const handleSearchChange = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    // setSearchField(e.target.value.toLowerCase())
    // console.log(searchField)
    setFilteredCountries(countries.filter(c => c.name.official.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleShowCountrie = (countrie) => {
    console.log("clicked", countrie)
    setFilteredCountries([countrie])
  }

  return (
    <>
      <h1>Countries App</h1>
      <p>Search for a countrie:</p> 
      <input onChange={handleSearchChange}></input>
      <div>
        <Countries filtered={filteredCountries} handleShowButton={handleShowCountrie} />
      </div>
    </>
  )
}

export default App