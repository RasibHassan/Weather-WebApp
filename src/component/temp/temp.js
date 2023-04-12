import React, { useState} from 'react'
import "./style.css"
import { useEffect } from 'react';
import Weathercard from './weathercard';
const Temp = () => {
    const [searchValue, setSearchValue] = useState("Karachi");
    const [tempInfo, settempInfo] = useState({});

    const getData =async ()=>{
      try {
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3d026d8c89cbf10e801c60701e62d109`
        const res= await fetch(url)
        const data= await res.json()
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
      settempInfo(myNewWeatherInfo);

      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      getData();
    },[])

  return (
    <div>
      <div className='wrap'>
        <div className='search'>
            <input type='search' placeholder='..' className='searchTerm' value={searchValue} onChange={(e)=> setSearchValue(e.target.value)}></input>
            <button className='searchButton' type='button' onClick={getData}>search</button>       
        
        
        </div>
      </div>
      <Weathercard {...tempInfo}/>
     
    </div>
  );
}

export default Temp
