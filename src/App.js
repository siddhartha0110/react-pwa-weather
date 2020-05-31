import React, { useState } from "react";
import fetchWeather from "./api/fetchWeather";
import "./App.css";
const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <p>
              <b>
                <i>
                  Real Feel: {weather.main.feels_like}
                  <sup>&deg;C</sup>
                </i>
              </b>
            </p>
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>
              Latitude: {weather.coord.lat}
              <br />
              Longitude: {weather.coord.lon}
              <br />
              Humidity: {weather.main.humidity}
              <br />
              Wind Speed: {weather.wind.speed} m/s
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
