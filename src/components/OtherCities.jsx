import { weatherIcons } from "../weatherIcons.js";
import "./OtherCities.css";

export default function OtherCities({ data, isFarenheit }) {
    const majorCity = data.majorCities;

    // Match weather icon
    // function getWeatherIcon(city) {
    //     const main = city.weather[0].main;
    //     const desc = city.weather[0].description.toLowerCase();
    //     const now = city.dt;
    //     const sunrise = city.sys?.sunrise;
    //     const sunset = city.sys?.sunset;
    //     const isNight = now < sunrise || now > sunset;

    //     const match = weatherIcons.find(
    //         (icon) =>
    //             icon.name === main &&
    //             icon.descriptions.some((d) => d.toLowerCase() === desc) &&
    //             (icon.time ? icon.time === (isNight ? "night" : "day") : true)
    //     );

    //     return match ? match.icon : windyIcon;
    // }

    // function getWeatherIcon(city) {
    //     const main = city.weather[0].main;
    //     const desc = city.weather[0].description.toLowerCase();

    //     // All dt, sunrise, and sunset values are in UTC seconds
    //     const nowUTC = Math.floor(Date.now() / 1000); // current UTC time in seconds
    //     const cityLocalTime = nowUTC + city.timezone; // adjust by city timezone offset (in seconds)
    //     const sunrise = city.sys?.sunrise;
    //     const sunset = city.sys?.sunset;

    //     // Determine if it's night there
    //     const isNight = cityLocalTime < sunrise || cityLocalTime > sunset;

    //     const match = weatherIcons.find(
    //         (icon) =>
    //             icon.name === main &&
    //             icon.descriptions.some((d) => d.toLowerCase() === desc) &&
    //             (icon.time ? icon.time === (isNight ? "night" : "day") : true)
    //     );

    //     return match ? match.icon : windyIcon;
    // }

    function getWeatherIcon(city) {
        const main = city.weather[0].main;
        const desc = city.weather[0].description.toLowerCase();

        const nowUTC = Math.floor(Date.now() / 1000); // current UTC time
        const sunrise = city.sys?.sunrise; // UTC seconds
        const sunset = city.sys?.sunset; // UTC seconds

        // Determine if it's night at the city
        const isNight =
            sunrise && sunset ? nowUTC < sunrise || nowUTC > sunset : false;

        const match = weatherIcons.find(
            (icon) =>
                icon.name === main &&
                icon.descriptions.some((d) => d.toLowerCase() === desc) &&
                (!icon.time || icon.time === (isNight ? "night" : "day"))
        );

        return match ? match.icon : windyIcon;
    }

    // Convert temps if needed
    const convertTemp = (temp) => (isFarenheit ? temp : ((temp - 32) * 5) / 9);

    return (
        <div className="other-cities">
            <h2>Other Major Cities</h2>
            {majorCity.map((city) => {
                return (
                    <div className="other-cities__card" key={city.id}>
                        <div className="other-cities__location">
                            <p>{city.sys.country}</p>
                            <p>{city.name}</p>
                            <p>{city.weather[0].main}</p>
                        </div>
                        <div className="other-cities__condition-temp">
                            <img
                                src={getWeatherIcon(city)}
                                alt={city.weather[0].description}
                            />
                            <p>
                                {Math.round(convertTemp(city.main.temp))}º
                                {isFarenheit ? "F" : "C"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
