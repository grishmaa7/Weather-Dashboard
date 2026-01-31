import { useContext } from "react";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";

const Settings = () => {
    const { unit, toggleUnit } = useContext(TemperatureUnitContext);

    return (
        <div className="settings-container">
            <h1>Settings 🛠️</h1>
            <p>Preferred Temperature Unit: {unit}</p>
            <button onClick={toggleUnit}>
                Switch to {unit === "C" ? "°F" : "°C"}
            </button>
        </div>
    );
};

export default Settings;
