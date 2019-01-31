const request = require('request');
const argv = require('yargs').argv;

let apiKey = `2f7e46391eeccd58299e57a98ee13ea8`;
let city = argv.c || `Dubai`;
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;



request(url, function(err, response, body) {
	if(err) {
		console.log('error:', error);
	}
	else {
		let weather = JSON.parse(body)
		let sunrise = new Date(weather.sys.sunrise).toLocaleTimeString("en-US") ;
		let sunset = new Date(weather.sys.sunset).toLocaleTimeString("en-US") ;
		let message = `It is ${weather.main.temp} degrees Celcius in ${weather.name} with ${weather.main.humidity} % humidity and ${weather.main.pressure} hPa for pressure! The minimum temp recorded was ${weather.main.temp_min} and the  maximum was ${weather.main.temp_max}, Sunrise will be at ${sunrise} and sunset at ${sunset}, wind speed is at ${weather.wind.speed} m/sec.`;
		console.log(message);
		
	}
});