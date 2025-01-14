/**
 * ================================================================
 *                      Weather Fetching Script
 * ================================================================
 *
 * This script retrieves the current weather information for a specified city.
 * It uses the OpenWeatherMap API to fetch weather data and outputs
 * key information such as the weather description and temperature.
 *
 * Assumptions:
 * - You need to provide a city name through the configuration (`config.city`).
 * - The script uses OpenWeatherMap's API and requires an API key, which
 *   should be passed as an environment variable for security purposes.
 *
 * Key Variables:
 * - `BASE_URL`: The base URL for the OpenWeatherMap API endpoint.
 * - `API_KEY`: Your OpenWeatherMap API key (should be stored securely).
 * - `city`: The city name (provided via the `config` object).
 * - `unit`: The unit for temperature (set to "imperial" for Fahrenheit).
 *
 * Output Fields:
 * - `description`: The general weather description (e.g., "Clear", "Cloudy").
 * - `temperature`: The current temperature in Fahrenheit.
 *
 * ================================================================
 */

let config = InputDeviceInfo.config();

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY = "API_KEY"; // PASS IT AS A ENV Variable if possible
let city = config.city;
let unit = "imperial";
const finalURL = `${BASE_URL}q=${city}&appid=${API_KEY}&units=${unit}`;

let getWeather = await fetch(`${finalURL}`);
let data = await getWeather.json();

// Fields:
output.set("weatherDetail", data.weather[0].main);
output.set("temperature", data.main.temp);
