import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "3fbb2b31fd3e77c536be64abc677a4d1",
  base: "https://api.openweathermap.org/data/2.5/"
};

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((data) => data.json())
        .then((result) => {
          console.log(result);
          setWeather({
            city: result.name,
            country: result.sys.country,
            avgTemp: Math.round(result.main.temp),
            minTemp: Math.round(result.main.temp_min),
            maxTemp: Math.round(result.main.temp_max),
            sky: result.weather[0].main,
            humidity: result.main.humidity
          });
        });
    }
  };

  useEffect(() => {
    setQuery("");
    console.log(weather);
  }, [weather]);

  return (
    <div className="app">
      <main>
        <div className="search">
          <input
            type="text"
            placeholder="Enter a city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={(e) => search(e)}
          />
        </div>
        {weather.city ? (
          <div className="weather-info">
            <div className="city">
              {weather.city}, {weather.country}
            </div>
            <div className="date">{new Date().toDateString()}</div>
            <div className="temperature-box">
              <div className="temperature">{weather.avgTemp}°c</div>
              <div className="temperature-range">
                {weather.minTemp} - {weather.maxTemp}°c
              </div>
            </div>
            <div className="sky">{weather.sky}</div>
            <div className="humidity">Humidity: {weather.humidity}%</div>
          </div>
        ) : (
          <div className="weather-info">
            <div className="city">City, Country</div>
            <div className="date">{new Date().toDateString()}</div>
            <div className="temperature-box">
              <div className="temperature">0°c</div>
              <div className="temperature-range">0 - 0°c</div>
            </div>
            <div className="sky">Weather</div>
          </div>
        )}
      </main>
    </div>
  );
}
