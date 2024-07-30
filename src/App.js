import React, { useState } from 'react';
import './App.css';

const api = {
  key: "8846072839a230b3a5b6fdb4ad7193b1",
  base: "https://api.openweathermap.org/data/2.5/"
}

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className="app">
      <input
        placeholder='Search...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search} />

      {
        (typeof weather.main != "undefined") ?
          (<div className="weather-info">
            <div>
              {weather.name}, {weather.sys.country}
              <div>{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">{Math.round(weather.main.temp)}°C</div>
            <div className="condition">{weather.weather[0].main}</div>
          </div>)
          : (<p className="placeholder-message">Please Enter the City in the Search Box</p>)
      }
    </div>
  );
}

export default App;
