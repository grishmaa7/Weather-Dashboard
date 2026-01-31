import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherService";
import { districts } from "../services/districts";

const Cities = () => {
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

    if (loading) return <p style={{ padding: "2rem" }}>Loading all cities weather...</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Weather in All Cities</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem", marginTop: "1rem" }}>
                {weatherData.map((weather) => (
                    <div key={weather.location.name} style={{
                        padding: "1rem",
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        textAlign: "center"
                    }}>
                        <h3>{weather.location.name}</h3>
                        <img src={weather.current.condition.icon} alt="weather icon" />
                        <p>{weather.current.temp_c}°C</p>
                        <p>{weather.current.condition.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cities;
