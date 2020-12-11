import React from 'react';
import kelvinToCelsius, { dayString } from '../../utils/functions';
import './weatherDetailsRender.css';

function WeatherRender({ weatherData }) {
	const sameName = weatherData.city !== weatherData.countryName ? true : false;

	return (
		<div className='weatherDetails'>
			<div className='weatherDetails__primary'>
				{sameName && (
					<h4>
						{weatherData.city}, {weatherData.countryName}
					</h4>
				)}
				{!sameName && <h4>{weatherData.countryName}</h4>}

				<h5 className='weatherDetails__today'>{dayString(new Date())}</h5>
				<h5 className='weatherDetails__today'>
					{new Date().toLocaleTimeString()}
				</h5>
				<h5 className='py4'>
					{
						<i
							className={`wi ${weatherData.icon} weatherDetails__icon`}
						></i>
					}
				</h5>
				<h1 className='weatherDetails__temp'>
					{kelvinToCelsius(weatherData.temp)}&deg;C
				</h1>
				<h4 className='weatherDetails__desc'>{weatherData.desc}</h4>
			</div>
			<p className='weatherDetails__others'>other details</p>
			<div className='weatherDetails__secondary'>
				<div className='weatherDetails__info'>
					<h4>
						min/max:{' '}
						<span>
							{kelvinToCelsius(weatherData.minTemp)}&deg;C /{' '}
							{kelvinToCelsius(weatherData.maxTemp)}&deg;C
						</span>
					</h4>
				</div>
				<div className='weatherDetails__info'>
					<h4>
						Humidity: <span>{weatherData.humidity}%</span>
					</h4>
				</div>
				<div className='weatherDetails__info'>
					<h4>
						Pressure: <span>{weatherData.pressure}hPa</span>
					</h4>
				</div>
				<div className='weatherDetails__info'>
					<h4>
						Wind Speed: <span>{weatherData.windSpeed}km/h</span>
					</h4>
				</div>
				<div className='weatherDetails__info'>
					<h4>
						Wind direction:{' '}
						<span>
							{weatherData.windDirection}
							&deg; deg
						</span>
					</h4>
				</div>
				<div className='weatherDetails__info'>
					<h4>
						Visibility: <span>{weatherData.visibility}km</span>
					</h4>
				</div>
			</div>
		</div>
	);
}
export default WeatherRender;
