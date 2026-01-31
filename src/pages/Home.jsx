const Home = () => {
    return (
        <div className="home-container">
            <h1>🌸 Welcome to the Weather Dashboard 🌸</h1>
            <p>Check the weather of all major cities in Nepal at a glance!</p>

            <div className="home-cards">
                <div className="home-card">
                    <h3>Real-time Weather</h3>
                    <p>Get live updates for all your favorite cities.</p>
                </div>
                <div className="home-card">
                    <h3>Save Preferences</h3>
                    <p>Choose your preferred temperature unit: Celsius or Fahrenheit.</p>
                </div>
                <div className="home-card">
                    <h3>Easy Navigation</h3>
                    <p>Quickly switch between Cities, Weather Details, and Settings pages.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;

