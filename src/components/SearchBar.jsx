import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({ setLocation }) => {
  const [city, setCity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setLocation({
          lat: data.results[0].latitude,
          lon: data.results[0].longitude,
        });
      }else {
        toast.error('Location not found !');
      }
    } catch (err) {
      toast.error('Error fetching location:', err);
    }
  };

  return (
    <form className="mb-8 w-4/5 md:w-2/3 mx-auto">
      <div className="flex justify-center gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors" onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
        <Toaster />
      </div>
    </form>
  );
};

export default SearchBar;