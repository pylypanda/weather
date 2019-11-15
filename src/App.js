import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "eb0e620ab5d3f3ff7ba8443c74ed4b38";

class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    wind: undefined,
    sunrise: undefined,
    sunset: undefined,
    icon: undefined,
    error: undefined
  };

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if(city) {
      try {
        const api_url = await
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        console.log(data);

        const time = ms => {
          var date = new Date(ms*1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          return hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
        }

        var sunrise_time = time(data.sys.sunrise);
        var sunset_time = time(data.sys.sunset);

        this.setState({
          city: data.name,
          country: data.sys.country,
          temp: data.main.temp,
          wind: data.wind.speed,
          sunrise: sunrise_time,
          sunset: sunset_time,
          icon: data.weather[0].icon,
          error: undefined
        });
      } catch (e) {
        this.setState({
          city: undefined,
          country: undefined,
          temp: undefined,
          wind: undefined,
          sunrise: undefined,
          sunset: undefined,
          icon: undefined,
          error: "Wrong name or the city does not exist."
        });
      }
    } else {
      this.setState({
        city: undefined,
        country: undefined,
        temp: undefined,
        wind: undefined,
        sunrise: undefined,
        sunset: undefined,
        icon: undefined,
        error: "Enter your city"
      });
    }

  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  city={this.state.city}
                  country={this.state.country}
                  temp={this.state.temp}
                  wind={this.state.wind}
                  sunrise={this.state.sunrise}
                  sunset={this.state.sunset}
                  icon={this.state.icon}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//api.openweathermap.org/data/2.5/weather?q=Prague,cz&appid=eb0e620ab5d3f3ff7ba8443c74ed4b38&units=metric

export default App;
