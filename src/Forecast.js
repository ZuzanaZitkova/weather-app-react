import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

export default function Weather() {
  let [city, setCity] = useState('');
  let [temperature, setTemperature] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);
  let [description, setDescription] = useState();
  let [icon, setIcon] = useState();
  let [update, setUpdate] = useState(false);
  function searchCity(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=485d2f0a81b80fd67c0fdbbb2894b1e4&units=metric`;
    axios.get(url).then(showTemp);
  }
  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function showTemp(response) {
    setUpdate(true);
    setHumidity(response.data.main.humidity);
    setTemperature(response.data.main.temp);
    setWind(response.data.wind.speed);
    setDescription(response.data.weather[0].description);
    setIcon(response.data.weather[0].icon);
  }

  let imageIcon = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  if (update) {
    return (
      <div>
        <form onSubmit={searchCity}>
          <input
            type="search"
            onChange={updateCity}
            placeholder="Enter a City"
          />
          <input type="submit" value="search" />
        </form>

        <ul className="list">
          <li>Description: {description}</li>
          <li>Temperature: {Math.round(temperature)} °C</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {wind} km/h</li>
          <li>
            {' '}
            <img src={imageIcon} alt="weather" />
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <form onSubmit={searchCity}>
          <input
            type="search"
            onChange={updateCity}
            placeholder="Enter a City"
          />
          <input id="button" type="submit" value="search" />
        </form>
      </div>
    );
  }
}
