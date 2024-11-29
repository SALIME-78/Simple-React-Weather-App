import { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import { getCityname } from "./utils/api";
import { toast } from "react-hot-toast";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ lat: 31.75, lon: 35.1875 });
  const [city, setCity] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, [location]);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      );
      const data = await response.json();
      const city = await getCityname(location.lat, location.lon);
      if (!city || city == undefined || city == null) {
        return toast.error("Location Not Found !");
      }

      setWeather(data);
      setCity(city);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-400 p-8">
      <div className="mx-auto" style={{ maxWidth: "85%" }}>
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Weather Forecast
        </h1>
        <SearchBar setLocation={setLocation} />
        {loading && <div className="text-white text-center my-4">Loading...</div>}
        <h2 className="text-3xl font-bold text-white text-center mb-8">Weather forcast in <a href={`https://www.google.com/maps/place/${city}`} className="text-red-600">{city}</a>  for a  week</h2>
        
        {error && <div className="text-red-200 text-center">{error}</div>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
