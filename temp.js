import React, { useState, useEffect } from "react";
import "./style.css";
import Weather from "./weather";
const Temp = () => {
  const [searchValue, setSearch] = useState("mumbai");
  const [tempInfo, setTempInfo] = useState({});
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5416eb993a6a5363ba9ae60e52cc65d2`;
      const response = await fetch(url);
      const data = await response.json();
      //   return data;
      // console.log(data);
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);
      // console.log(temp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Enter the city"
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <Weather tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
