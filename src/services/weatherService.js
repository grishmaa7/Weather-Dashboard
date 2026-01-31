import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Vite env
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherByCity = async (city, unit = "metric") => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                units: unit,
                appid: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
