import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={{
            padding: "1rem 2rem",
            backgroundColor: "#1E90FF",
            color: "white",
            display: "flex",
            gap: "1rem",
            alignItems: "center"
        }}>
            <h2 style={{ marginRight: "2rem" }}>Weather Dashboard</h2>
            <Link to="/" style={{ color: "white" }}>Home</Link>
            <Link to="/cities" style={{ color: "white" }}>Cities</Link>
            <Link to="/settings" style={{ color: "white" }}>Settings</Link>
        </nav>
    );
};

export default Navbar;
