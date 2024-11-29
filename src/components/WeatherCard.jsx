import { Cloud, CloudRain, Sun, CloudSun } from 'lucide-react';

const WeatherCard = ({ weather }) => {
  console.log(weather)
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weather.daily.time.map((date, index) => (
          <div
            key={date}
            className="bg-blue-50 p-4 rounded-lg text-center"
          >
            <div className="font-semibold mb-2">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </div>
            <div className="text-sm text-gray-600">
              {new Date(date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
                {weather.daily.precipitation_probability_max[index] >= 50 && <CloudRain className='m-auto' />}
                {weather.daily.precipitation_probability_max[index] > 20 && weather.daily.precipitation_probability_max[index] < 50 && <Cloud className='m-auto' />}
                {weather.daily.precipitation_probability_max[index] <= 30 && weather.daily.precipitation_probability_max[index] > 0 && <CloudSun  className='m-auto' />}
                {weather.daily.precipitation_probability_max[index] == 0 && <Sun  className='m-auto' />}
            <div className="mt-2">
              <div className="text-red-500">
                {Math.round(weather.daily.temperature_2m_max[index])}°C
              </div>
              <div className="text-blue-500">
                {Math.round(weather.daily.temperature_2m_min[index])}°C
              </div>
            </div>
            <div className="mt-2 text-sm">
              {weather.daily.precipitation_probability_max[index]}% rain
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;