import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
export default function Weather() {
  const [data, setData] = useState({ conditions: [] });
  const [icon, setIcon] = useState([]);
  const [date] = useState(new Date().toLocaleString());
  const [temp, setTemp] = useState();
  const [description, setDescription] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [humidity, setHumidiy] = useState();
  const [clicked, setClicked] = useState(false);
  const [country, setCountry] = useState();

  useEffect(() => {
    axios
      .get(
        "http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=4dcfde4946565afdf33140db1ef9fa17"
      )
      .then((res) => {
        const conditions = res.data;
        setData({ conditions });
        setIcon(conditions.weather[0].icon);
        setTemp(conditions.main.temp);
        setFeelsLike(conditions.main.feels_like);
        setDescription(conditions.weather[0].description);
        setHumidiy(conditions.main.humidity);
        setCountry(conditions.sys.country);
      });
  }, []);
  console.log(data.conditions);
  function changeClickedStatus() {
    setClicked(!clicked);
  }

  return (
    <div className="city">
      <h2 className="city-name">
        <span>{data.conditions.name}</span>
        <sup>{country}</sup>
      </h2>
      <p>{date}</p>
      <div className="city-temp">
        {Math.round(temp)}
        <sup>&deg;C</sup>
      </div>
      <div className="info">
        <img
          className="city-icon"
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        />
        <p>{description}</p>
        <button id="button" onClick={changeClickedStatus}>
          Click to see Details
        </button>
        {clicked ? (
          <div>
            <p>
              feels like:
              <img
                className="feelslikeIcon"
                src={
                  "https://cdn0.iconfinder.com/data/icons/essentials-marketing-2-1/128/temperature-hot-track-512.png"
                }
              />
              {feelsLike}
            </p>
            <p>
              Humidity:
              <img
                className="feelslikeIcon"
                src={
                  "http://icons.iconarchive.com/icons/custom-icon-design/lovely-weather-2/512/Humidity-icon.png"
                }
              />
              {humidity}
            </p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
