import axios from "axios"
const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY


const  URLAllCountries = "https://studies.cs.helsinki.fi/restcountries/api/all"
const baseURLCountrie = "https://studies.cs.helsinki.fi/restcountries/api/name"


const getAllCountries = () => {
    const request = axios.get(URLAllCountries)
    return request.then(response => response.data)
}

const getCountrie = (name) => {
    const request = axios.get(`${baseURLCountrie}/${name}`)
    return request.then(response => response.data)
}

const getWeather = (lat, long) => {
    const request = axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${"metric"}&appid=${api_key}`)
    return request.then(response => {
        console.log(response.data)
        return response.data
    })
}

export default { getAllCountries, getCountrie, getWeather } 