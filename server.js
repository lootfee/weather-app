const express = require('express');
const bodyParser = require("body-parser");
const request = require('request');
const app = express();

const apiKey = `2f7e46391eeccd58299e57a98ee13ea8`;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.render('index', {weather: null, error: nll});
});

app.post('/', function(req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;
	
	request(url, function(err, response, body) {
		if(err){
			res.render('index', {weather: null, error: 'Please try again'});
		}
		else {
			let weather = JSON.parse(body);
			let sunrise = new Date(weather.sys.sunrise).toLocaleTimeString("en-US") ;
			let sunset = new Date(weather.sys.sunset).toLocaleTimeString("en-US") ;
			if(weather.main == undefined) {
				res.render('index', {weather: null, error: 'Please try again'});
		}
		else {
			let weatherText = `It is ${weather.main.temp} degrees Celcius in ${weather.name} with ${weather.main.humidity} % humidity and ${weather.main.pressure} hPa for pressure! The minimum temp recorded was ${weather.main.temp_min} and the  maximum was ${weather.main.temp_max}, Sunrise will be at ${sunrise} and sunset at ${sunset}, wind speed is at ${weather.wind.speed} m/sec.`;
			res.render('index', {weather: weatherText, error: null});
		}
	}
});
})

app.listen(3000, function() {
	console.log('listening ')
})