/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;

const App = () => {
  const [location, setLocation] = useState('Fresno, CA');
  const [weatherData, setWeatherData] = useState(null);
  const geocodeUrl = `https://geocode.maps.co/search?q=${location}`;
  const searchWeather = (location) => {
    // const geocodeUrl = `https://geocode.maps.co/search?q=${location}`;
  }
  useEffect(() => {
    // $ 1) geocode location specified in the 'location' state variable (remember: API calls are async!)
    axios
      .get(geocodeUrl)
      .then((geoResponse) => {
        // $ 2) once response is received, extract the latitude and longitude and save in variables
        const { lat, lon } = geoResponse.data[0];
        console.log(`Latitude: ${lat} | Longitude: ${lon}`);

        // $ 3) then take latitude and longitude and plug them into the weather API call (remember: async again!)
        axios
          .get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
          )
          .then((weatherResponse) => {
            // $ 4) once the data is received from the weather API, log it out and save it to state
            console.log('Weather API data:', weatherResponse.data);
            setWeatherData(weatherResponse.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
      const handleFormSubmit = (e) => {
        e.preventDefault();
        searchWeather(location);
      };
      useEffect(() => {
        // $ 1) geocode location specified in the 'location' state variable (remember: API calls are async!)
        searchWeather(location);
      }, []);     
  return (
    <div>
      <h1>OpenWeatherMap API - Current Weather for {location}:</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="search">
          <input
            type="text"
            name="search"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button type="submit">Get weather</button>
      </form>
      {weatherData ? (
        <p>
          <code>{JSON.stringify(weatherData)}</code>
        </p>
      ) : (
        <p>Pretend I&#39;m a loading spinner!!!</p>
      )}
    </div>
  );
 };
export default App;

