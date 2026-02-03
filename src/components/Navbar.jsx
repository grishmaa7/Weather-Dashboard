import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h2>🌸 Weather Dashboard 🌸</h2>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/cities">Cities</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/login">Login</Link>      
                <Link to="/register">Register</Link> 
            </div>
        </nav>
    );
};

export default Navbar;
