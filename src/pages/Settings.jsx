import { useContext, useState } from "react";
import { TemperatureUnitContext } from "../context/TemperatureUnitContext";

const Settings = () => {
    const { unit, toggleUnit } = useContext(TemperatureUnitContext);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Settings</h1>
            <p>Preferred Temperature Unit: {unit}</p>
            <button onClick={toggleUnit} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
                Switch to {unit === "C" ? "°F" : "°C"}
            </button>
        </div>
    );
};

export default Settings;
