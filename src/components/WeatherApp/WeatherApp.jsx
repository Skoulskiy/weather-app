import React, { useState } from 'react'
import s from './WeatherApp.module.css'
import search_icon from '../Assets/search.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import clear_icon from "../Assets/clear.png"

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [humidity, setHumidity] = useState(54);
    const [wind, setWind] = useState(12);
    const [temperature, setTemperature] = useState(23);
    const [location, setLocation] = useState('London');
    const [wicon, setWicon] = useState(cloud_icon);
    const api_key = 'enter-your-key';
    const search = async () => {
        if(city.length < 1) return 0;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
        setTemperature(data.main.temp);
        setLocation(data.name);
        if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n'){
            setWicon(clear_icon)
        } else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n') {
            setWicon(cloud_icon)
        } else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n') {
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n') {
            setWicon(drizzle_icon)
        } else if(data.weather[0].icon==='09d' || data.weather[0].icon==='92n') {
            setWicon(rain_icon)
        } else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n') {
            setWicon(rain_icon)
        } else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n') {
            setWicon(snow_icon)
        }
        setCity('');
    }
  return (
    <div className={s.container}>
        <div className={s.topBar}>
            <input type="text" className='city-input' placeholder='Search' value={city} onChange={e => (setCity(e.target.value))}/>
            <div className={s.sicon}>
                <img src={search_icon} alt='' onClick={() => {search()}}></img>
            </div>
        </div>
        <div className={s.weatherImg}>
            <img src={wicon} alt="" />
        </div>
        <div className={s.weatherTemp}>{temperature}&deg;c</div>
        <div className={s.weatherLocation}>{location}</div>
        <div className={s.dataContainer}>
            <div className={s.element}>
                <img src={humidity_icon} className={s.icon}/>
                <div className={s.data}>
                    <div className={s.humidityPercent}>{humidity}%</div>
                    <div className={s.text}>Humidity</div>
                </div>
            </div>
            <div className={s.element}>
                <img src={wind_icon} className={s.icon}/>
                <div className={s.data}>
                    <div className={s.humidityPercent}>{wind} km/h</div>
                    <div className={s.text}>Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp