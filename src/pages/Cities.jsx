import { useState, useEffect, useContext } from "react";
import { getWeatherByCity } from "../services/weatherService";
import { districts } from "../services/districts";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";

const Cities = () => {
    const { unit } = useContext(TemperatureUnitContext);
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllWeather = async () => {
            const results = [];
            for (let city of districts) {
                const data = await getWeatherByCity(city);
                if (data) results.push(data);
            }
            setWeatherData(results);
            setLoading(false);
        };

        fetchAllWeather();
    }, []);

    if (loading) return <p style={{ padding: "2rem", textAlign: "center" }}>Loading all cities weather...</p>;

    return (
        <div className="cities-grid">
            {weatherData.map((weather) => {
                const temp = unit === "C" ? weather.current.temp_c : weather.current.temp_f;
                const wind = unit === "C" ? weather.current.wind_kph : weather.current.wind_mph;

                return (
                    <div key={weather.location.name} className="city-card">
                        <h3>{weather.location.name}</h3>
                        <img src={weather.current.condition.icon} alt="weather icon" />
                        <p>{temp}°{unit}</p>
                        <p>{weather.current.condition.text}</p>
                        <p>Wind: {wind} {unit === "C" ? "kph" : "mph"}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Cities;
