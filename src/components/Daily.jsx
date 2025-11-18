// import { weatherIcons } from "../weatherIcons.js";
// import windyIcon from "../assets/windy.svg";
// import "./Daily.css";

// export default function Daily({ data, isFarenheit }) {
//     const forecastList = data.forecast.list;
//     const timezoneOffset = data.forecast.city.timezone;

//     function getMiddayInterval(intervals) {
//         let closest = intervals[0];
//         let minDiff = Infinity;
//         intervals.forEach((interval) => {
//             const localTime = new Date((interval.dt + timezoneOffset) * 1000);
//             const diff = Math.abs(localTime.getHours() - 12);
//             if (diff < minDiff) {
//                 minDiff = diff;
//                 closest = interval;
//             }
//         });
//         return closest;
//     }

//     const dailyMap = {};
//     forecastList.forEach((interval) => {
//         const localTime = new Date((interval.dt + timezoneOffset) * 1000);

//         // Build LOCAL date key
//         const year = localTime.getFullYear();
//         const month = String(localTime.getMonth() + 1).padStart(2, "0");
//         const day = String(localTime.getDate()).padStart(2, "0");
//         const dayKey = `${year}-${month}-${day}`;

//         if (!dailyMap[dayKey]) dailyMap[dayKey] = [];
//         dailyMap[dayKey].push(interval);
//     });

//     // Compute each day's forecast data
//     const dailyForecasts = Object.entries(dailyMap).map(
//         ([dayKey, intervals]) => {
//             const temps = intervals.map((i) => i.main.temp); // already in °F
//             const minTemp = Math.min(...temps);
//             const maxTemp = Math.max(...temps);

//             const middayInterval = getMiddayInterval(intervals);

//             return {
//                 dayKey,
//                 minTemp,
//                 maxTemp,
//                 main: middayInterval.weather[0].main,
//                 description: middayInterval.weather[0].description,
//                 dt: middayInterval.dt,
//             };
//         }
//     );

//     // Sort by date and take only 5 days (starting with today)
//     dailyForecasts.sort((a, b) => new Date(a.dayKey) - new Date(b.dayKey));
//     const fiveDayForecasts = dailyForecasts.slice(0, 5);

//     // Convert temp only when displayed
//     const convertTemp = (f) => (isFarenheit ? f : ((f - 32) * 5) / 9);

//     // Global temp range (still raw °F)
//     const globalMinTemp = Math.min(...fiveDayForecasts.map((d) => d.minTemp));
//     const globalMaxTemp = Math.max(...fiveDayForecasts.map((d) => d.maxTemp));

//     // Match weather icon based on time of day
//     function getWeatherIcon(main, description, intervalDt) {
//         const desc = description.toLowerCase();
//         const localTime = new Date((intervalDt + timezoneOffset) * 1000);
//         const hour = localTime.getHours();
//         const isNight = hour < 6 || hour >= 18;

//         const match = weatherIcons.find(
//             (icon) =>
//                 icon.name === main &&
//                 icon.descriptions.some((d) => d.toLowerCase() === desc) &&
//                 (!icon.time || icon.time === (isNight ? "night" : "day"))
//         );

//         return match ? match.icon : windyIcon;
//     }

//     return (
//         <div className="daily">
//             <h2>5-Day Forecast</h2>
//             {fiveDayForecasts.map((day, index) => {
//                 const dayName = (() => {
//                     const [y, m, d] = day.dayKey.split("-");
//                     return new Date(y, m - 1, d).toLocaleDateString("en-US", {
//                         weekday: "short",
//                     });
//                 })();

//                 // Convert day-specific temps to F/C
//                 const dayMin = convertTemp(day.minTemp);
//                 const dayMax = convertTemp(day.maxTemp);

//                 // Convert global only once here
//                 const minConverted = convertTemp(globalMinTemp);
//                 const maxConverted = convertTemp(globalMaxTemp);
//                 const rangeConverted = maxConverted - minConverted;

//                 // Percent positions
//                 const left = ((dayMin - minConverted) / rangeConverted) * 100;
//                 const width = ((dayMax - dayMin) / rangeConverted) * 100;

//                 return (
//                     <div className="daily__cards" key={day.dayKey}>
//                         <p className="daily__day">
//                             {index === 0 ? "Today" : dayName}
//                         </p>

//                         <div className="daily__condition">
//                             <img
//                                 src={getWeatherIcon(
//                                     day.main,
//                                     day.description,
//                                     day.dt
//                                 )}
//                                 alt={day.description}
//                                 className="daily__icon"
//                             />
//                             <p className="daily__condition-desc">{day.main}</p>
//                         </div>

//                         <div className="daily__temp-range">
//                             <p>
//                                 {Math.round(dayMin)}º{isFarenheit ? "F" : "C"}
//                             </p>

//                             <div className="daily__temp-bar-container">
//                                 <div
//                                     className="daily__temp-bar"
//                                     style={{
//                                         left: `${left}%`,
//                                         width: `${width}%`,
//                                     }}
//                                 ></div>
//                             </div>

//                             <p>
//                                 {Math.round(dayMax)}º{isFarenheit ? "F" : "C"}
//                             </p>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }




import { weatherIcons } from "../weatherIcons.js";
import windyIcon from "../assets/windy.svg";
import "./Daily.css";

export default function Daily({ data, isFarenheit }) {
    const forecastList = data.forecast.list;
    const timezoneOffset = data.forecast.city.timezone;

    function getMiddayInterval(intervals) {
        let closest = intervals[0];
        let minDiff = Infinity;
        intervals.forEach((interval) => {
            const localTime = new Date((interval.dt + timezoneOffset) * 1000);
            const diff = Math.abs(localTime.getHours() - 12);
            if (diff < minDiff) {
                minDiff = diff;
                closest = interval;
            }
        });
        return closest;
    }

    const nowUTC = Math.floor(Date.now() / 1000);
    const cityTime = new Date((nowUTC + timezoneOffset) * 1000);
    const cityDateKey = cityTime.toISOString().split("T")[0];

    const todayIntervals = forecastList.filter((interval) => {
        const localTime = new Date((interval.dt + timezoneOffset) * 1000);
        return localTime.toISOString().split("T")[0] === cityDateKey;
    });

    const todayTemps = todayIntervals.map((i) => i.main.temp);
    const todayRealMin = Math.min(...todayTemps);
    const todayRealMax = Math.max(...todayTemps);

    const dailyMap = {};
    forecastList.forEach((interval) => {
        const localTime = new Date((interval.dt + timezoneOffset) * 1000);

        const year = localTime.getFullYear();
        const month = String(localTime.getMonth() + 1).padStart(2, "0");
        const day = String(localTime.getDate()).padStart(2, "0");
        const dayKey = `${year}-${month}-${day}`;

        if (!dailyMap[dayKey]) dailyMap[dayKey] = [];
        dailyMap[dayKey].push(interval);
    });

    const dailyForecasts = Object.entries(dailyMap).map(
        ([dayKey, intervals]) => {
            const temps = intervals.map((i) => i.main.temp);
            const minTemp = Math.min(...temps);
            const maxTemp = Math.max(...temps);

            const middayInterval = getMiddayInterval(intervals);

            return {
                dayKey,
                minTemp,
                maxTemp,
                main: middayInterval.weather[0].main,
                description: middayInterval.weather[0].description,
                dt: middayInterval.dt,
            };
        }
    );

    dailyForecasts.sort((a, b) => new Date(a.dayKey) - new Date(b.dayKey));
    const fiveDayForecasts = dailyForecasts.slice(0, 5);

    const convertTemp = (f) => (isFarenheit ? f : ((f - 32) * 5) / 9);

    const globalMinTemp = Math.min(...fiveDayForecasts.map((d) => d.minTemp));
    const globalMaxTemp = Math.max(...fiveDayForecasts.map((d) => d.maxTemp));

    function getWeatherIcon(main, description, intervalDt) {
        const desc = description.toLowerCase();
        const localTime = new Date((intervalDt + timezoneOffset) * 1000);
        const hour = localTime.getHours();
        const isNight = hour < 6 || hour >= 18;

        const match = weatherIcons.find(
            (icon) =>
                icon.name === main &&
                icon.descriptions.some((d) => d.toLowerCase() === desc) &&
                (!icon.time || icon.time === (isNight ? "night" : "day"))
        );

        return match ? match.icon : windyIcon;
    }

    return (
        <div className="daily">
            <h2>5-Day Forecast</h2>
            {fiveDayForecasts.map((day, index) => {
                const dayName = (() => {
                    const [y, m, d] = day.dayKey.split("-");
                    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
                        weekday: "short",
                    });
                })();

                if (index === 0 && todayTemps.length > 0) {
                    day.minTemp = todayRealMin;
                    day.maxTemp = todayRealMax;
                }

                const dayMin = convertTemp(day.minTemp);
                const dayMax = convertTemp(day.maxTemp);

                const minConverted = convertTemp(globalMinTemp);
                const maxConverted = convertTemp(globalMaxTemp);
                const rangeConverted = maxConverted - minConverted;

                const left =
                    ((dayMin - minConverted) / rangeConverted) * 100;
                const width =
                    ((dayMax - dayMin) / rangeConverted) * 100;

                return (
                    <div className="daily__cards" key={day.dayKey}>
                        <p className="daily__day">
                            {index === 0 ? "Today" : dayName}
                        </p>

                        <div className="daily__condition">
                            <img
                                src={getWeatherIcon(
                                    day.main,
                                    day.description,
                                    day.dt
                                )}
                                alt={day.description}
                                className="daily__icon"
                            />
                            <p className="daily__condition-desc">
                                {day.main}
                            </p>
                        </div>

                        <div className="daily__temp-range">
                            <p>
                                {Math.round(dayMin)}º{isFarenheit ? "F" : "C"}
                            </p>

                            <div className="daily__temp-bar-container">
                                <div
                                    className="daily__temp-bar"
                                    style={{
                                        left: `${left}%`,
                                        width: `${width}%`,
                                    }}
                                ></div>
                            </div>

                            <p>
                                {Math.round(dayMax)}º{isFarenheit ? "F" : "C"}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}