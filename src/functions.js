// options.filter((option)=>option.name.toLowerCase().startsWith(place.country))

export const kelvinToCelsius = (temp) => {
	let celsius = Math.floor(temp - 273.15);
	return celsius;
};

//Capitalize the first letter of each word in a string
export const capitalizeFirstLetterOfEachWord = (words) => {
	var separateWord = words.toLowerCase().split(' ');
	for (var i = 0; i < separateWord.length; i++) {
		separateWord[i] =
			separateWord[i].charAt(0).toUpperCase() + separateWord[i].substring(1);
	}
	return separateWord.join(' ');
};

//Check if the first character of a string is uppercase or lowercase
export const checkCharType = (charToCheck) => {
	let returnValue = '0';
	let charCode = charToCheck.charCodeAt(0);
	if (charCode >= 'A'.charCodeAt(0) && charCode <= 'Z'.codePointAt(0)) {
		returnValue = 'U';
	} else if (charCode >= 'a'.charCodeAt(0) && charCode <= 'z'.codePointAt(0)) {
		returnValue = 'L';
	}
	return returnValue;
};

//function to get country code from the list of coutries
export const getCountryCode = (cList, cName, i) => {
	for (i = 0; i < cList.length; i++) {
		if (cList[i].name === cName) {
			return { name: cList[i].name, code: cList[i].code };
		}
	}
};

export const dayString = (d) => {
	let months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	let days = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	const thur = 'Thursday';

	return `${
		days[d.getDay()] === thur ? day.substring(0, 4) : day.substring(0, 3)
	} ${date} ${month.substring(0, 3)} ${year}`;
};

export const abc = {
	weatherIcons: {
		Thunderstorm: 'wi-thunderstorm',
		Sunny: 'wi-day-sunny',
		Drizzle: 'wi-sleet',
		Rain: 'wi-day-storm-showers',
		Snow: 'wi-day-snow',
		Atmosphere: 'wi-fog',
		Clear: 'wi-day-sunny',
		Clouds: 'wi-cloudy',
	},

	bgClassList: [
		'thunderstorm',
		'drizzle',
		'rain',
		'snow',
		'fog',
		'clear',
		'cloudy',
		'sunny',
	],

	getWeatherIconAndBgclass: function (rangeId) {
		let item = {};

		switch (true) {
			case rangeId >= 200 && rangeId <= 232:
				item = {
					icon: this.weatherIcons.Thunderstorm,
					bgClass: this.bgClassList[0],
				};
				break;
			case rangeId >= 300 && rangeId <= 321:
				item = {
					icon: this.weatherIcons.Drizzle,
					bgClass: this.bgClassList[1],
				};
				break;
			case rangeId >= 500 && rangeId <= 531:
				item = {
					icon: this.weatherIcons.Rain,
					bgClass: this.bgClassList[2],
				};
				break;
			case rangeId >= 600 && rangeId <= 622:
				item = {
					icon: this.weatherIcons.Snow,
					bgClass: this.bgClassList[3],
				};
				break;
			case rangeId >= 701 && rangeId <= 781:
				item = {
					icon: this.weatherIcons.Atmoshpere,
					bgClass: this.bgClassList[4],
				};
				break;
			case rangeId === 800:
				item = {
					icon: this.weatherIcons.Clear,
					bgClass: this.bgClassList[5],
				};
				break;
			case rangeId >= 801 && rangeId <= 804:
				item = {
					icon: this.weatherIcons.Clouds,
					bgClass: this.bgClassList[6],
				};
				break;
			default:
				item = {
					icon: this.weatherIcons.Sunny,
					bgClass: this.bgClassList[7],
				};
		}
		return item;
	},
};

export default kelvinToCelsius;
