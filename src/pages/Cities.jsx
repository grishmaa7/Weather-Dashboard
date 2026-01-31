import { Link } from "react-router-dom";

const Cities = () => {
    const cities = ["Kathmandu", "Pokhara", "Lalitpur", "Biratnagar"];

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Select a City</h1>
            <ul style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
                {cities.map((city) => (
                    <li key={city}>
                        <Link to={`/weather/${city}`} style={{
                            padding: "0.5rem 1rem",
                            display: "inline-block",
                            background: "#1E90FF",
                            color: "white",
                            borderRadius: "5px",
                            transition: "0.3s",
                        }}>
                            {city}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cities;
