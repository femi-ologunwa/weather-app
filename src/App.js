import React from 'react';
import Weather from './components/weather_component/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';

function App() {
	return (
		<div className='app'>
			<Weather />
		</div>
	);
}

export default App;
