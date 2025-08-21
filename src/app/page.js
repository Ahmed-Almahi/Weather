"use client";
import React, { useState } from 'react';
import { fetchWeatherByCountry } from '../context';
import Image from 'next/image';
import Logo from '../assets/logo.svg';

export default function Home() {
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setWeather(null);
    try {
  const data = await fetchWeatherByCountry(country);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-white to-yellow-100 p-4 relative w-full">
      <a
        href="https://github.com/Ahmed-Almahi/Weather.git"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="absolute top-6 right-8 z-50 hover:scale-110 transition-transform"
      >
        <svg height="32" width="32" viewBox="0 0 16 16" fill="currentColor" className="text-gray-800 hover:text-blue-600">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.1 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.09.16 1.9.08 2.1.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl p-8 backdrop-blur-md">
        <div className="flex flex-col items-center mb-6">
          <Image src={Logo} alt="Weather" className="h-30 w-auto mb-2 drop-shadow-lg" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter country name..."
            value={country}
            onChange={e => setCountry(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center animate-pulse">{error}</div>
        )}
        {weather && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <img
              src={weather.current?.condition?.icon}
              alt={weather.current?.condition?.text}
              className="w-24 h-24 drop-shadow-lg"
            />
            <div className="text-2xl font-bold text-blue-800">{weather.location?.name}, {weather.location?.country}</div>
            <div className="text-5xl font-extrabold text-gray-900">{weather.current?.temp_c}&deg;C</div>
            <div className="text-lg text-gray-700">{weather.current?.condition?.text}</div>
            <div className="flex gap-6 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-blue-500 font-semibold">Humidity</span>
                <span className="text-lg">{weather.current?.humidity}%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-yellow-500 font-semibold">Wind</span>
                <span className="text-lg">{weather.current?.wind_kph} kph</span>
              </div>
            </div>
          </div>
        )}
        {!weather && !loading && !error && (
          <div className="text-center text-gray-400 mt-8">Search for a country to see the weather.</div>
        )}
      </div>
      <footer className="mt-8 text-gray-500 text-sm text-center">
        Powered by <a href="https://www.weatherapi.com/" className="underline text-blue-600" target="_blank" rel="noopener noreferrer">WeatherAPI.com</a>
        <div className="mt-2">Created by Ahmed Al-Mahi</div>
      </footer>
    </div>
  );
}