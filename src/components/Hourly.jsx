// import { weatherIcons } from "../weatherIcons.js";
// import windyIcon from "../assets/windy.svg";
// import "./Hourly.css";

// export default function Hourly({ data, isFarenheit }) {
//     const forecast = data.forecast;
//     const forecastList = forecast.list;
//     const timezoneOffset = forecast.city.timezone;

//     // Current time in the city
//     const nowUTC = new Date().getTime();
//     const nowCity = new Date(nowUTC + timezoneOffset * 1000);

//     // Filter for upcoming intervals
//     const upcomingIntervals = forecastList.filter((interval) => {
//         const intervalTime = new Date(
//             interval.dt * 1000 + timezoneOffset * 1000
//         );
//         return intervalTime >= nowCity;
//     });

//     // Convert temps
//     const convertTemp = (temp) => (isFarenheit ? temp : ((temp - 32) * 5) / 9);

//     // Match weather icons
//     function getWeatherIcon(main, description) {
//         const desc = description.toLowerCase();
//         const now = data.current.dt;
//         const sunrise = data.current.sys?.sunrise;
//         const sunset = data.current.sys?.sunset;
//         const isNight =
//             sunrise && sunset ? now < sunrise || now > sunset : false;

//         const match = weatherIcons.find(
//             (icon) =>
//                 icon.name === main &&
//                 icon.descriptions.some((d) => d.toLowerCase() === desc) &&
//                 (!icon.time || icon.time === (isNight ? "night" : "day"))
//         );

//         return match ? match.icon : windyIcon;
//     }

//     return (
//         <div className="hourly">
//             {upcomingIntervals.slice(0, 8).map((interval) => {
//                 const intervalTime = new Date(
//                     interval.dt * 1000 + timezoneOffset * 1000
//                 );

//                 const formattedTime = intervalTime.toLocaleTimeString("en-US", {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                     hour12: true,
//                     timeZone: "UTC",
//                 });

//                 const main = interval.weather[0].main;
//                 const description = interval.weather[0].description;
//                 const icon = getWeatherIcon(main, description);

//                 return (
//                     <div className="hourly__cards" key={interval.dt}>
//                         <p className="hourly__time">{formattedTime}</p>
//                         <div className="hourly__condition">
//                             <img
//                                 src={icon}
//                                 alt={description}
//                                 className="hourly__icon"
//                             />
//                             <p className="hourly__condition-desc">{main}</p>
//                         </div>
//                         <p className="hourly__temp">
//                             {Math.round(convertTemp(interval.main.temp))}º
//                             {isFarenheit ? "F" : "C"}
//                         </p>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

import { weatherIcons } from "../weatherIcons.js";
import windyIcon from "../assets/windy.svg";
import "./Hourly.css";

export default function Hourly({ data, isFarenheit }) {
    const forecast = data.forecast;
    const forecastList = forecast.list;
    const timezoneOffset = forecast.city.timezone;

    // Convert temps
    const convertTemp = (temp) => (isFarenheit ? temp : ((temp - 32) * 5) / 9);

    // Match weather icons
    function getWeatherIcon(main, description, intervalDt) {
        const desc = description.toLowerCase();
        const sunrise = data.current.sys?.sunrise;
        const sunset = data.current.sys?.sunset;

        // Determine if this interval is night
        const isNight =
            sunrise && sunset
                ? intervalDt < sunrise || intervalDt > sunset
                : false;

        const match = weatherIcons.find(
            (icon) =>
                icon.name === main &&
                icon.descriptions.some((d) => d.toLowerCase() === desc) &&
                (!icon.time || icon.time === (isNight ? "night" : "day"))
        );

        return match ? match.icon : windyIcon;
    }

    // Filter for upcoming intervals
    const upcomingIntervals = forecastList.filter((interval) => {
        // const intervalTimeUTC = interval.dt + timezoneOffset; // seconds
        // const nowCityUTC = Math.floor(Date.now() / 1000 + timezoneOffset);
        // return intervalTimeUTC >= nowCityUTC;
        const nowUTC = Math.floor(Date.now() / 1000);
        return interval.dt >= nowUTC;
    });

    return (
        <div className="hourly">
            {upcomingIntervals.slice(0, 8).map((interval) => {
                const intervalTime = new Date(
                    (interval.dt + timezoneOffset) * 1000
                );

                const formattedTime = intervalTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: "UTC",
                });

                const main = interval.weather[0].main;
                const description = interval.weather[0].description;

                const icon = getWeatherIcon(
                    interval.weather[0].main,
                    description,
                    interval.dt
                );

                return (
                    <div className="hourly__cards" key={interval.dt}>
                        <div className="hourly__time">
                            <p>{formattedTime}</p>
                        </div>
                        <div className="hourly__condition">
                            <img
                                src={icon}
                                alt={description}
                                className="hourly__icon"
                            />
                            <p className="hourly__condition-desc">{main}</p>
                        </div>
                        <p className="hourly__temp">
                            {Math.round(convertTemp(interval.main.temp))}º
                            {isFarenheit ? "F" : "C"}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
