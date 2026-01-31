import { createContext, useState } from "react";

export const TemperatureUnitContext = createContext();

export const TemperatureUnitProvider = ({ children }) => {
    const savedUnit = localStorage.getItem("tempUnit") || "C";
    const [unit, setUnit] = useState(savedUnit);

    const toggleUnit = () => {
        const newUnit = unit === "C" ? "F" : "C";
        setUnit(newUnit);
        localStorage.setItem("tempUnit", newUnit);
    };

    return (
        <TemperatureUnitContext.Provider value={{ unit, toggleUnit }}>
            {children}
        </TemperatureUnitContext.Provider>
    );
};
