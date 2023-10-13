import React, { useState } from "react";
import "./WeatherApp.css";
import search_icon from "../../Assests/search.png";
import cloud_icon from "../../Assests/cloud.png";
import humidity_icon from "../../Assests/humidity.png";
import wind_icon from "../../Assests/wind.png";
import clear_icon from "../../Assests/wind.png";
import drizzle_icon from "../../Assests/drizzle.png";
import rain_icon from "../../Assests/rain.png";
import snow_icon from "../../Assests/snow.png";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [location, setLocation] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);

  const inputHandler = (e) => {
    setCity(e.target.value);
  };

  const search = async () => {
    if (city === "") {
      return 0;
    }

    if (city !== undefined) {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb195817425b4eea809b8e398843e6d2&units=metric`;

      let response = await fetch(url);
      let data = await response.json();
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemperature(data.main.temp);
      setLocation(data.name);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setWeatherIcon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setWeatherIcon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n"
      ) {
        setWeatherIcon(drizzle_icon);
      } else if (
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setWeatherIcon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n"
      ) {
        setWeatherIcon(rain_icon);
      } else if (
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setWeatherIcon(rain_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather[0].icon === "13n"
      ) {
        setWeatherIcon(snow_icon);
      } else {
        setWeatherIcon(clear_icon);
      }
      
    } else {
      console.log("Fetching Data");
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onChange={inputHandler}
        />
        <div
          className="search-icon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="search-icon" />
        </div>
      </div>
      <div className="weather-image">
        <img src={weatherIcon} alt="cloud-icon" />
      </div>
      <div className="weather-temp">{temperature}°C</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} className="icon" />
          <div className="data">
            <div className="humidity-percent">{humidity}%</div>
            <div className="text">humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} className="icon" />
          <div className="data">
            <div className="humidity-percent">{wind} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
