import axios from "axios";

const API_KEY = "a5cb900c402c40238d7111716263101";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

export const getWeatherByCity = (city) => {
    return axios
        .get(BASE_URL, {
            params: {
                key: API_KEY,
                q: city
            }
        })
        .then(res => res.data)
        .catch(err => {
            console.error("Error fetching weather:", err);
            return null;
        });
};
