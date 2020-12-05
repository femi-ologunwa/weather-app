import React, { useState } from 'react';
import WeatherRender from '../weatherDetailsRender/WeatherDetailsRender';
import Loading from '../loading_component/Loading';
import { abc, checkCharType, getCountryCode } from '../functions';
import Error from '../error_component/Error';
import countryList from '../countries';
import './weather.css';

function Weather() {
	const [place, setPlace] = useState({ city: '', country: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [render, setRender] = useState(false);
	const [display, setDisplay] = useState(false);
	const [errMsg, setErrMsg] = useState({ title: '', content: '' });
	const [weatherData, setWeatherData] = useState({
		city: null,
		countryCode: null,
		temp: null,
		desc: null,
		minTemp: null,
		maxTemp: null,
		humidity: null,
		pressure: null,
		windSpeed: null,
		windDirection: null,
		visibility: null,
		countryName: null,
		icon: null,
		bgClassName: null,
	});

	const options = countryList;
	//let countryName = '';

	const clickInput = (name) => {
		setPlace({ ...place, country: name });
		//countryName = name;
		setDisplay(false);
	};

	const handleCityChange = (e) => {
		setPlace({ ...place, city: e.target.value });
	};

	const handleCountryChange = (e) => {
		let countryNameFirstChar = e.target.value;

		// //convert the first letter of the entered country name to uppercase
		const firstCharTypeCase = checkCharType(countryNameFirstChar);
		if (firstCharTypeCase === 'L') {
			countryNameFirstChar = countryNameFirstChar.toUpperCase();
			setPlace({ ...place, country: countryNameFirstChar });
			setDisplay(true);
		} else {
			setPlace({ ...place, country: countryNameFirstChar });
			setDisplay(true);
		}

		if (countryNameFirstChar === '') {
			setDisplay(false);
		}
	};

	//Function to add timeout to fetch request
	async function fetchWithTimeout(resource, options) {
		const { timeout = 8000 } = options;

		const controller = new AbortController();
		const id = setTimeout(() => controller.abort(), timeout);

		const response = await fetch(resource, {
			...options,
			signal: controller.signal,
		});
		clearTimeout(id);

		return response;
	}

	//Function to fetch weather info from API (Timed Function)
	const fetchWeather = async (city, country) => {
		const apiKey = 'b7078507ea208792f29878091c44f4f3';
		const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

		setLoading(true);
		try {
			const response = await fetchWithTimeout(url, { timeout: 6000 });
			const weather = await response.json();
			const countryDetails = getCountryCode(options, place.country);
			console.log(weather);

			//get weather icon and background class
			const weatherIcon = abc.getWeatherIconAndBgclass(
				weather.weather[0].id
			);

			if (
				countryDetails.code === weather.sys.country ||
				((countryDetails.code === 'ENG' || 'SCT' || 'NRE' || 'WLS') &&
					weather.sys.country === 'GB')
			) {
				setWeatherData({
					city: weather.name,
					countryCode: weather.sys.country,
					temp: weather.main.temp,
					desc: weather.weather[0].description,
					minTemp: weather.main.temp_min,
					maxTemp: weather.main.temp_max,
					humidity: weather.main.humidity,
					pressure: weather.main.pressure,
					windSpeed: weather.wind.speed,
					windDirection: weather.wind.deg,
					visibility: weather.visibility,
					countryName: countryDetails.name,
					icon: weatherIcon.icon,
					bgClassName: weatherIcon.bgClass,
				});
				setLoading(false);
				setRender(true);
				setError(false);
			} else {
				setLoading(false);
				setRender(false);
				setWeatherData({
					city: null,
					countryCode: null,
					temp: null,
					desc: null,
					minTemp: null,
					maxTemp: null,
					humidity: null,
					pressure: null,
					windSpeed: null,
					windDirection: null,
					visibility: null,
					countryName: null,
					icon: null,
					bgClassName: null,
				});

				const fetchErrorMsg = {
					title: 'Error!',
					content: 'Something went wrong...',
				};
				setErrMsg({
					title: fetchErrorMsg.title,
					content: fetchErrorMsg.content,
				});
				setError(true);
			}
		} catch (error) {
			setLoading(false);
			setRender(false);
			if (error.name === 'TypeError') {
				const fetchErrorMsg = {
					title: 'Error!',
					content: 'Could not fetch data...',
				};
				setErrMsg({
					title: fetchErrorMsg.title,
					content: fetchErrorMsg.content,
				});
				setError(true);
			}
			if (error.name === 'AbortError') {
				const fetchErrorMsg = {
					title: 'Network Error!',
					content: 'Poor network connection...',
				};
				setErrMsg({
					title: fetchErrorMsg.title,
					content: fetchErrorMsg.content,
				});
				setError(true);
			}
		}
	};

	//Fetch weather info
	async function handleSubmit(e) {
		e.preventDefault();
		setDisplay(false);

		if (place.city && place.country) {
			fetchWeather(place.city, place.country);
			setPlace({ city: '', country: '' });
		} else {
			const error = {
				title: 'Error!',
				content: 'City and Country names are mandatory...',
			};

			setErrMsg({ title: error.title, content: error.content });
			setError(true);
		}
	}

	//Close Error Modal
	const closeModal = () => {
		setError(false);
		setErrMsg({ title: '', content: '' });
		setLoading(false);
		setRender(false);
		setWeatherData({
			city: null,
			countryCode: null,
			temp: null,
			desc: null,
			minTemp: null,
			maxTemp: null,
			humidity: null,
			pressure: null,
			windSpeed: null,
			windDirection: null,
			visibility: null,
			countryName: null,
			icon: null,
			bgClassName: null,
		});
	};

	return (
		<div
			className={`container weather__container ${weatherData.bgClassName}`}
		>
			<div className='weather__content'>
				<div className='weather__inner'>
					<h2 className='logo'>Weatherly</h2>
					<form className='form-grid' onSubmit={handleSubmit}>
						<div>
							<input
								type='text'
								name='city'
								value={place.city}
								onChange={handleCityChange}
								autoComplete='off'
								placeholder='City'
							/>
						</div>

						<div className='formCountry'>
							<input
								type='text'
								name='country'
								value={place.country}
								onChange={handleCountryChange}
								autoComplete='off'
								placeholder='Country'
							/>

							{display && (
								<div className='countryList'>
									{options
										.filter((option) =>
											option.name.startsWith(place.country)
										)
										.map((option) => {
											return (
												<div
													key={option.code}
													onClick={() => clickInput(option.name)}
												>
													{option.name}
												</div>
											);
										})}
								</div>
							)}
						</div>

						<button type='submit' className='btn'>
							Get Weather
						</button>
					</form>
					{loading && <Loading />}
					{error && <Error errMsg={errMsg} closeModal={closeModal} />}
					{render && <WeatherRender weatherData={weatherData} />}
				</div>
			</div>
			<footer>
				<p>&copy; 2020 by Femi Ologunwa</p>
			</footer>
		</div>
	);
}

export default Weather;
