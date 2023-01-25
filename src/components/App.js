import { useEffect, useState } from "react";
import "../styles/App.css";
import WeatherInfo from "./WeatherInfo";

function App() {
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("Moscow");
  const [error, setError] = useState("");
  function onEnter(event) {
    if (event.key === "Enter") {
      fetchAPI();
    }
  }
  const fetchAPI = async () => {
    if (!search) {
      return;
    }
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=959fbc882edd4522b59134540213007&q=${search}`
    );
    const resJSON = await res.json();
    if (res.ok) {
      setCity([...city, resJSON]);
      setSearch("");
    } else {
      setError(resJSON.error.message);
    }
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  const stopRestart = (e) => {
    e.preventDefault();
    fetchAPI();
  };

  const handleError = (e) => {
    setSearch(e.currentTarget.value);
    setError("");
  };

  return (
    <>
      <div className="header">
        <h1>Weather</h1>
      </div>
      <div className="search-city">
        <input
          className="input"
          onKeyPress={(event) => onEnter(event)}
          value={search}
          type="text"
          placeholder="Search for a city"
          onChange={handleError}
        />
        <button
          className="fa-sharp fa-solid fa-magnifying-glass-location"
          onClick={stopRestart}
        ></button>
      </div>
      <div className="error">{error}</div>
      <div>
        {city.map((data) => (
          <WeatherInfo key={data.location.tz_id} data={data} />
        ))}
      </div>
    </>
  );
}

export default App;
