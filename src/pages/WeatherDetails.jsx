import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getWeatherByCity } from "../services/weatherService";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";

const WeatherDetails = () => {
    const { city } = useParams();
    const { unit } = useContext(TemperatureUnitContext);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        getWeatherByCity(city).then((data) => setWeather(data));
    }, [city]);

    if (!weather) return <p style={{ padding: "2rem", textAlign: "center" }}>Loading weather details...</p>;

    const temp = unit === "C" ? weather.current.temp_c : weather.current.temp_f;
    const wind = unit === "C" ? weather.current.wind_kph : weather.current.wind_mph;

    return (
        <div className="weather-card">
            <h2>Weather in {city}</h2>
            <img src={weather.current.condition.icon} alt="weather icon" />
            <p>{temp}°{unit}</p>
            <p>{weather.current.condition.text}</p>
            <p>Humidity: {weather.current.humidity}%</p>
            <p>Wind: {wind} {unit === "C" ? "kph" : "mph"}</p>
        </div>
    );
};

export default WeatherDetails;
