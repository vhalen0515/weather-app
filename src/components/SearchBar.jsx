import { useState } from "react";
import UnitButton from "./UnitButton.jsx";
import "./SearchBar.css";

export default function SearchBar({
    onDataSubmit,
    onUnitToggle,
    isFarenheit,
    setLoading,
}) {
    const [city, setCity] = useState("");
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!city.trim()) return;

        try {
            setLoading(true);
            // Current weather
            const weatherRes = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
            );
            const weatherData = await weatherRes.json();

            if (weatherData.cod !== 200) {
                alert("City not found!");
                setLoading(false);
                return;
            }

            // Forecast
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`
            );
            const forecastData = await forecastRes.json();

            // Major cities
            const majorCities = ["Honolulu", "Miami", "Athens"];
            const majorCityData = await Promise.all(
                majorCities.map((city) =>
                    fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                            city
                        )}&units=imperial&appid=${API_KEY}`
                    ).then((res) => res.json())
                )
            );

            const data = {
                current: weatherData,
                forecast: forecastData,
                majorCities: majorCityData,
            };

            onDataSubmit(data);

            setCity("");

            console.log(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search city..."
                    aria-label="Search city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </form>
            <UnitButton onToggle={onUnitToggle} isFarenheit={isFarenheit} />
        </div>
    );
}
