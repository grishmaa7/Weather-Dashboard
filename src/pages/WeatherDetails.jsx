import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getWeatherByCity } from "../services/weatherService";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";

const WeatherDetails = () => {
    const { city } = useParams();
    const { unit } = useContext(TemperatureUnitContext);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const data = await getWeatherByCity(city, unit === "C" ? "metric" : "imperial");
            setWeather(data);
        };
        fetchWeather();
    }, [city, unit]);

    if (!weather) return <p>Loading weather data...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Weather in {city}</h1>
            <p>Temperature: {weather.main.temp}°{unit}</p>
            <p>Weather: {weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} {unit === "C" ? "m/s" : "mph"}</p>
        </div>
    );
};

export default WeatherDetails;
