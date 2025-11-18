import clearIcon from "./assets/clear.svg";

import partlyCloudyIcon from "./assets/cloudy-1.svg";
import mostlyCloudyIcon from "./assets/cloudy-2.svg";
import cloudyIcon from "./assets/cloudy-3.svg";

import lightRainIcon from "./assets/rainy-1.svg";
import moderateRainIcon from "./assets/rainy-2.svg";
import heavyRainIcon from "./assets/rainy-3.svg";

import lightSnowIcon from "./assets/snowy-1.svg";
import heavySnowIcon from "./assets/snowy-2.svg";

import lightThunderstormIcon from "./assets/thunderstorms-1.svg";
import heavyThunderstormIcon from "./assets/thunderstorms-2.svg";

import windyIcon from "./assets/windy.svg";
import fogIcon from "./assets/fog.svg";
import tornadoIcon from "./assets/tornado.svg";
import dustIcon from "./assets/dust.svg";

import clearNightIcon from "./assets/clear-night.svg";
import partlyCloudyNightIcon from "./assets/cloudy-night-1.svg";
import mostlyCloudyNightIcon from "./assets/cloudy-night-2.svg";

export const weatherIcons = [
    // ☀️ CLEAR
    {
        name: "Clear",
        descriptions: ["clear sky"],
        time: "day",
        icon: clearIcon,
    },
    {
        name: "Clear",
        descriptions: ["clear sky"],
        time: "night",
        icon: clearNightIcon,
    },

    // ☁️ CLOUDS
    {
        name: "Clouds",
        descriptions: ["few clouds"],
        time: "day",
        icon: partlyCloudyIcon,
    },
    {
        name: "Clouds",
        descriptions: ["few clouds"],
        time: "night",
        icon: partlyCloudyNightIcon,
    },
    {
        name: "Clouds",
        descriptions: ["scattered clouds"],
        time: "day",
        icon: mostlyCloudyIcon,
    },
    {
        name: "Clouds",
        descriptions: ["scattered clouds"],
        time: "night",
        icon: mostlyCloudyNightIcon,
    },
    {
        name: "Clouds",
        descriptions: ["broken clouds", "overcast clouds"],
        icon: cloudyIcon,
    },

    // 🌦️ DRIZZLE
    {
        name: "Drizzle",
        descriptions: [
            "light intensity drizzle",
            "drizzle",
            "heavy intensity drizzle",
            "light intensity drizzle rain",
            "drizzle rain",
        ],
        icon: lightRainIcon,
    },
    {
        name: "Drizzle",
        descriptions: [
            "heavy intensity drizzle rain",
            "shower rain and drizzle",
            "heavy shower rain and drizzle",
            "shower drizzle",
        ],
        icon: moderateRainIcon,
    },

    // 🌧️ RAIN
    {
        name: "Rain",
        descriptions: [
            "light rain",
            "light intensity shower rain",
        ],
        icon: lightRainIcon,
    },
        {
        name: "Rain",
        descriptions: [
            "moderate rain",
        ],
        icon: moderateRainIcon,
    },
    {
        name: "Rain",
        descriptions: [
            "heavy intensity rain",
            "very heavy rain",
            "extreme rain",
            "heavy intensity shower rain",
            "ragged shower rain",
        ],
        icon: heavyRainIcon,
    },
    {
        name: "Rain",
        descriptions: ["freezing rain"],
        icon: heavySnowIcon,
    },

    // 🌨️ SNOW
    {
        name: "Snow",
        descriptions: ["light snow", "snow"],
        icon: lightSnowIcon,
    },
    {
        name: "Snow",
        descriptions: [
            "heavy snow",
            "sleet",
            "light shower sleet",
            "shower sleet",
            "light rain and snow",
            "rain and snow",
            "light shower snow",
            "shower snow",
            "heavy shower snow",
        ],
        icon: heavySnowIcon,
    },

    // ⛈️ THUNDERSTORM
    {
        name: "Thunderstorm",
        descriptions: [
            "thunderstorm with light rain",
            "thunderstorm with rain",
            "light thunderstorm",
        ],
        icon: lightThunderstormIcon,
    },
    {
        name: "Thunderstorm",
        descriptions: [
            "thunderstorm with heavy rain",
            "heavy thunderstorm",
            "ragged thunderstorm",
            "thunderstorm with drizzle",
            "thunderstorm with heavy drizzle",
        ],
        icon: heavyThunderstormIcon,
    },

    // 🌫️ ATMOSPHERE (fog, haze, dust, etc.)
    {
        name: "Atmosphere",
        descriptions: ["mist", "smoke", "haze", "fog"],
        icon: fogIcon,
    },
    {
        name: "Atmosphere",
        descriptions: ["sand", "dust", "sand/dust whirls"],
        icon: dustIcon,
    },
    {
        name: "Atmosphere",
        descriptions: ["volcanic ash"],
        icon: dustIcon,
    },
    {
        name: "Atmosphere",
        descriptions: ["squalls"],
        icon: windyIcon,
    },
    {
        name: "Atmosphere",
        descriptions: ["tornado"],
        icon: tornadoIcon,
    },
];
