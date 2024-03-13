import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import humidity_icon from '../Assets/humidity.png'
const WeatherApp =  () => {
  let api_key="c100e78fb8eb1e6874c95592405f93e5"
  const [weatherIcon,setWicon] = useState(cloud_icon)

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      var data = await response.json();
  
      // Check if data contains expected properties
      if (!data.main || !data.main.humidity || !data.wind || !data.wind.speed || !data.weather || !data.weather[0]) {
        throw new Error('Unexpected response format');
      }
  
      const humidity = document.getElementsByClassName("humidity-percent");
      const wind = document.getElementsByClassName("wind-rate");
      const temprature = document.getElementsByClassName("weather-temp");
      const location = document.getElementsByClassName("weather-location");
  
      humidity[0].innerHTML = data.main.humidity + "%";
      wind[0].innerHTML = data.wind.speed + " Km/h";
      temprature[0].innerHTML = data.main.temp + " C";
      location[0].innerHTML = data.name;
  
      // Update weather icon based on weather condition
      // Make sure to handle all weather conditions
  
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Handle error, e.g., display error message to the user
    }
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
      setWicon(clear_icon)
    }
    else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
      setWicon(cloud_icon)
    }
    else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
      setWicon(drizzle_icon)
    }
    else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
      setWicon(rain_icon)
    }
    else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
      setWicon(snow_icon)
    }
    else{
      setWicon(clear_icon)
    }
  

  };
  


  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search'/>
        <div className='search-icon' onClick={()=>{search()}}>
          <img src={search_icon} alt=""/>
        </div>


      </div>
      <div className='weather-image'>
        <img src={weatherIcon} alt=''/>
      </div>
      <div className='weather-temp'>24 C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} className='icon' alt=''/>
          <div className='data'>
            <div className='humidity-percent'>64</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} className='icon' alt=''/>
          <div className='data'>
            <div className='wind-rate'>18 Km/h</div>
            <div className='text'>wind Speed</div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default WeatherApp