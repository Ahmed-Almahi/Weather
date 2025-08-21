"use client";

export async function fetchWeatherByCountry(country) {
	const baseUrl = process.env.NEXT_PUBLIC_WEATHER_API_BASE_URL;
	const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
	if (!baseUrl || !apiKey) throw new Error('API configuration missing');
	const url = `${baseUrl}?q=${encodeURIComponent(country)}&key=${apiKey}`;
	const res = await fetch(url);
	if (!res.ok) throw new Error('Country not found');
	return res.json();
}