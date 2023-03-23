import React from 'react';
import '../cascade/ForecastDays.css';

function ForecastDays(props) {
    // num and realDay is for getting the day -> finally!
    const realDay = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat'
    ];

    var num = new Date(props.data.time * 1000).getDay();

    return(
        <div>
            <p className='realDay' >{realDay[num]}</p>
            <img className='iconDay' src={props.data.condition.icon_url} alt={props.data.condition.description} />
            <p className='min-max' >{Math.round(props.data.temperature.minimum)}° | {Math.round(props.data.temperature.maximum)}°</p>
        </div>
    )
}

export default ForecastDays;