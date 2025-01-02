import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import envCompatible from 'vite-plugin-env-compatible';


function Weather() {

  const inputVal=useRef()
  const[weatherData,setWeatherData]=useState(false);

  const all={
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09n": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow
  }
  const search= async (city) => {
    if(city==="")
      {
        alert("Enter Valid City Name ");
        return; 
      }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4b9c4ad1f478193ee9c44e5a516da9db`;
    
      const response=await fetch(url);
      const data=await response.json();
      if(!response.ok)
      {
        alert(data.message)
      }
      console.log(data);
      const icon=all[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    }
    catch(error){
      setWeatherData(false);
      console.error("Sorry !! There's an error in fetching the weather data ")
    }
  }
    useEffect(()=>{
      search("");
    },[])
  return (
    <div className='weather'>
      <div className='search-bar'>
      <input ref={inputVal} type="text" placeholder='Enter City Name' />
      <img src={search_icon} alt="searchicon" onClick={()=> search(inputVal.current.value)}/>
    </div>
    {weatherData ?<>
      <img src= {weatherData.icon} alt="" className='sunicon'/>
      <p className='temperature'>{weatherData.temperature}°C </p>
      <p className='cityname'>{weatherData.location}</p>
      <div className='Wdata'>
        <div className='col'>
          <img src={humidity}/>
          <div>
            <p>{weatherData.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className='col'>
          <img src={wind}/>
          <div>
            <p>{weatherData.windspeed}Km / Hr</p>
            <span>Wind Speed</span>
          </div>
        </div>
        </div>
        </> :
        <></> }
      
    </div>

  )
}
export default Weather;