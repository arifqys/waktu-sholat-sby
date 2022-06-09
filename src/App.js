import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [data, setData] = useState()
  const [isLoaded, setisLoaded] = useState(false)
  
  useEffect(() => {
    axios.defaults.baseURL = "https://api.aladhan.com/v1/";
    axios.get("currentTimestamp?zone=Asia/Jakarta")
      .then(res => {
        const timestamp = res.data.data;
        if (!!timestamp) {
          axios.get(`timingsByCity/${timestamp}?city=Surabaya&country=ID`)
            .then(res => {
              setData(res.data.data.timings);
              setisLoaded(true);
            })
        }
      })
  }, [])

  const now = new Date()

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center py-10">Waktu Sholat Surabaya</h1>
      <div className="text-center py-4">
        <small>{now.toLocaleDateString('id-ID', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</small>
        <p>{now.toLocaleTimeString('id-ID')}</p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center flex-wrap py-4">
        <div className="card">
          Shubuh
          <p>{isLoaded ? data.Fajr : null}</p>
        </div>
        <div className="card">
          Dhuhur
          <p>{isLoaded ? data.Dhuhr : null}</p>
        </div>
        <div className="bg-white m-3 p-5 sm:p-10 rounded shadow-md hover:shadow-lg">
          Ashar
          <p>{isLoaded ? data.Asr : null}</p>
        </div>
        <div className="bg-white m-3 p-5 sm:p-10 rounded shadow-md hover:shadow-lg">
          Maghrib
          <p>{isLoaded ? data.Maghrib : null}</p>
        </div>
        <div className="bg-white m-3 p-5 sm:p-10 rounded shadow-md hover:shadow-lg">
          Isya
          <p>{isLoaded ? data.Isha : null}</p>
        </div>
      </div>

    </div>
  )
}

export default App
