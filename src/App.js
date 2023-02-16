import Search from "./components/search/search";
import "./App.css";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import { useState } from "react";
import Forecast from "./forecast/forecast";
function App() {
  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = async (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.replaceAll(" ", "").split(",");
    console.log(lat);
    console.log(lon.includes(" "));

    const currentWeatherFetch = await fetch(
      `${WEATHER_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then((res) => res.json());

    const forcastFetch = await fetch(
      `${WEATHER_API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then((res) => res.json());
    console.log("forcast", forcastFetch);
    setcurrentWeather({ city: searchData.label, ...currentWeatherFetch });
    setForecast({ city: searchData.label, ...forcastFetch });

    console.log("fetch", currentWeatherFetch);
  };

  console.log(currentWeather);
  console.log(forecast);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
