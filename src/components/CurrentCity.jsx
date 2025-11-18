import { weatherIcons } from "../weatherIcons.js";
import windyIcon from "../assets/windy.svg";
import "./CurrentCity.css";

export default function CurrentCity({ data, isFarenheit }) {
    const current = data.current;
    const forecastList = data.forecast.list;
    const timezoneOffset = data.forecast.city.timezone;

    const nowUTC = Math.floor(Date.now() / 1000);
    const cityTime = new Date((nowUTC + timezoneOffset) * 1000);

    // 🗓️ Get the city’s date key (e.g., "2025-10-29")
    const cityDateKey = cityTime.toISOString().split("T")[0];

    // 🌤️ Filter forecast intervals for that date
    const todayIntervals = forecastList.filter((interval) => {
        const localTime = new Date((interval.dt + timezoneOffset) * 1000);
        return localTime.toISOString().split("T")[0] === cityDateKey;
    });

    // 🌡️ Compute today's min and max temps
    const todayTemps = todayIntervals.map((i) => i.main.temp);
    const todayMin = Math.min(...todayTemps);
    const todayMax = Math.max(...todayTemps);

    // Convert temps if needed
    const convertTemp = (temp) => (isFarenheit ? temp : ((temp - 32) * 5) / 9);

    // Match weather icon
    function getWeatherIcon(main, description) {
        const desc = description.toLowerCase();
        const now = current.dt;
        const sunrise = current.sys?.sunrise;
        const sunset = current.sys?.sunset;
        const isNight = now < sunrise || now > sunset;

        const match = weatherIcons.find(
            (icon) =>
                icon.name === main &&
                icon.descriptions.some((d) => d.toLowerCase() === desc) &&
                (icon.time ? icon.time === (isNight ? "night" : "day") : true)
        );

        return match ? match.icon : undefined;
    }

    // 🕰️ Format the city time correctly
    const formattedTime = cityTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "UTC",
    });

    return (
        <div className="current-city">
            <div className="current-city__first-row current-city__row">
                <p className="current-city__temp">
                    {Math.round(convertTemp(current.main.temp))}º
                    {isFarenheit ? "F" : "C"}
                </p>
                <div className="currenty-city__info">
                    <p className="current-city__city">{current.name}</p>
                    <p className="current-city__time">{formattedTime}</p>
                </div>
            </div>
            <div className="current-city__second-row current-city__row">
                <div className="current-city__condition-container">
                    <img
                        src={getWeatherIcon(
                            current.weather[0].main,
                            current.weather[0].description
                        )}
                        alt={current.weather[0].description}
                    />
                    <p className="current-city__condition">
                        {current.weather[0].main}
                    </p>
                </div>
                <div className="current-city__wind">
                    <img src={windyIcon} alt="Icon of wind" />
                    <p>{Math.round(current.wind.speed)} mph</p>
                </div>
            </div>
            <div className="current-city__third-row current-city__row">
                <p>
                    Feels like:{" "}
                    {Math.round(convertTemp(current.main.feels_like))}º
                    {isFarenheit ? "F" : "C"}
                </p>
                <p>
                    {Math.round(convertTemp(todayMin))}º to{" "}
                    {Math.round(convertTemp(todayMax))}º
                </p>
            </div>
        </div>
    );
}
