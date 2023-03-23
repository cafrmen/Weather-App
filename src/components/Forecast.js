import React from "react";
import { useState, useEffect } from "react";
import ForecastDays from "./ForecastDays";
import axios from 'axios';
import '../cascade/Forecast.css';


function Forecast (props) {
    const[loaded, setLoaded] = useState(false);
    const[forecast, setForecast] = useState([]);

    //useEffect everytime we have different data from props.city
    useEffect(() => {
        setLoaded(false);
    }, [props.city])

    // Fetching data from the API
    const showForecast = (response) => {
        setForecast(response.data.daily);
        setLoaded(true);
    }

    // the conditional rendering using map to create a list
    if (loaded) {
        return (
            <div className="forecast-component" >
                {forecast.map((daily, index) => {
                    if (index < 5) {
                        return (
                            <div key={index}>
                                <ForecastDays data={daily} />
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
        )
    } else {
        const apiKey = '0cf59t0e2c893844dbfaeaa60d40d36o';
        const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${props.city}&key=${apiKey}&units=metric`;

        axios.get(apiUrl).then(showForecast);

        return null;
    }
}

export default Forecast;
