import React from "react";

const Weather = props => (
  <div className="infoWeath">
    { props.city &&
      <div>
        <p>Location: {props.city}, {props.country}</p>
        <img id="weatherIcon" src={"http://openweathermap.org/img/w/" + props.icon + ".png"} alt="Weather Icon" />
        <p>Temperature: {props.temp}°C</p>
        <p>Wind speed: {props.wind} m/s</p>
        <p>Sunrise: {props.sunrise}</p>
        <p>Sunset: {props.sunset}</p>
      </div>
    }
    <p className="error">{props.error}</p>
  </div>
)

export default Weather;
