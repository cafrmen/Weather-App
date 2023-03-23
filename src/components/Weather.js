import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios';
import '../cascade/Weather.css';


function Weather (props) {
    // The important API
    const apiKey = '0cf59t0e2c893844dbfaeaa60d40d36o';
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${props.city}&key=${apiKey}&units=metric`;

    // The values that must be set
    const[city, setCity] = useState('');
    const[country, setCountry] = useState('');
    const[current, setCurrent] = useState('');
    const[description, setDescription] = useState('');
    const[iconUrl, setIconUrl] = useState('');
    const[humidity, setHumidity] = useState('');
    const[pressure, setPressure] = useState('');
    const[wind, setWind] = useState('');
    const[feelsLike, setFeelsLike] = useState('');

    // The magic of fetching API data with axios and useEffect
    const showTemperature = (response) => {
        setCity(response.data.city);
        setCountry(response.data.country);
        setCurrent(Math.round(response.data.temperature.current));
        setDescription(response.data.condition.description);
        setIconUrl(response.data.condition.icon_url);
        setHumidity(response.data.temperature.humidity);
        // The pressure is in Pascal, to convert it into inHg, divide into 33.86
        setPressure(Math.round(((response.data.temperature.pressure) / 33.86).toFixed(2)));
        setWind(Math.round(response.data.wind.speed));
        setFeelsLike(Math.round(response.data.temperature.feels_like));
    }
    // useEffect is always used for fetching data
    useEffect(() => {
        axios.get(apiUrl).then(showTemperature).catch((error) => {console.log(error)});
    })
    // wind is the last info in the API
    if (wind) {
        return (
            <div className="weather-component" >
                <h3 className="current-city" >
                    {city}, <span className="country" >{country}</span>
                </h3>
                <img className="icon" src={iconUrl} alt={description} />
                <p className="degree" >{current}°C</p>
                <p className="description" >{description}</p>
                <div className="others" >
                    <ul className="others" >
                        <li>Humidity:<small> {humidity}%</small></li>
                        <li>Pressure:<small> {pressure} inHg</small></li>
                        <li>Wind:<small> {wind} km/h</small></li>
                        <li>Feels like:<small> {feelsLike}°C</small></li>
                    </ul>
                </div>
            </div>
        )
    } else {
        axios.get(apiUrl).then(showTemperature);

        return null;
    }
}

export default Weather;