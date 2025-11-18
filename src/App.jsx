import { useState } from "react";
import Home from "./components/Home.jsx";
import SearchBar from "./components/SearchBar.jsx";
import CurrentCity from "./components/CurrentCity.jsx";
import Hourly from "./components/Hourly.jsx";
import Daily from "./components/Daily.jsx";
import OtherCities from "./components/OtherCities.jsx";
import { Radio } from "react-loader-spinner";
import "./Loading.css";

export default function App() {
    const [submitted, setSubmitted] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [isFarenheit, setIsFarenheit] = useState(true);
    const [loading, setLoading] = useState(false);

    function handleDataSubmit(data) {
        setWeatherData(data);
        setSubmitted(true);
    }

    function handleUnitToggle(useFarenheit) {
        setIsFarenheit(useFarenheit);
    }

    return (
        <main className={submitted ? "dashboard" : ""}>
            {!submitted ? (
                loading ? (
                    <div className="loading-screen">
                        <Radio
                            colors={[
                                "hsl(207, 77%, 20%)",
                                "hsl(207, 77%, 30%)",
                                "hsl(207, 77%, 40%)",
                            ]}
                        />
                    </div>
                ) : (
                    <Home
                        onDataSubmit={handleDataSubmit}
                        setLoading={setLoading}
                    />
                )
            ) : (
                <div className="dashboard-container">
                    <SearchBar
                        onDataSubmit={handleDataSubmit}
                        onUnitToggle={handleUnitToggle}
                        isFarenheit={isFarenheit}
                        setLoading={setLoading}
                    />
                    <div className="dashboard-content">
                        {loading ? (
                            <div className="loading-dashboard">
                                <Radio
                                    colors={[
                                        "hsl(207, 77%, 20%)",
                                        "hsl(207, 77%, 30%)",
                                        "hsl(207, 77%, 40%)",
                                    ]}
                                />
                            </div>
                        ) : (
                            <div className="dashboard-content-info">
                                <CurrentCity
                                    data={weatherData}
                                    isFarenheit={isFarenheit}
                                    className="current"
                                />
                                <Hourly
                                    data={weatherData}
                                    isFarenheit={isFarenheit}
                                    className="hourly"
                                />
                                <Daily
                                    data={weatherData}
                                    isFarenheit={isFarenheit}
                                    className="daily"
                                />
                                <OtherCities
                                    data={weatherData}
                                    isFarenheit={isFarenheit}
                                    className="other"
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
