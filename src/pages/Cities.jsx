import { Link } from "react-router-dom";

const Cities = () => {
    const cities = ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Select a City</h1>
            <ul>
                {cities.map((city) => (
                    <li key={city} style={{ margin: "1rem 0" }}>
                        <Link to={`/weather/${city}`} style={{ textDecoration: "none", color: "#1E90FF" }}>
                            {city}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cities;
