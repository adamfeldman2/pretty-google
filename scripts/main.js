var startPage = {}

// Get location info from API
startPage.getLocation = function() {
	$.ajax({
		url: 'http://api.wunderground.com/api/f609c12eaf0610a5/geolookup/q/autoip.json',
		method: 'GET',
		dataType: 'jsonp'
	})
	.then(function(cityData) {

		// console.log(cityData);
		
		var cityName = cityData.location.city; //Stores name of city
		console.log('Your city: ' + cityName);

		var countryName = cityData.location.country_name; //Stores name of country
		// console.log(countryName);

		startPage.getWeather(cityName,countryName);
	
	});
};

// Get weather forecast for specified location
startPage.getWeather = function(cityName,countryName) {
	$.ajax({
		url: 'http://api.wunderground.com/api/f609c12eaf0610a5/conditions/q/autoip.json',
		method: 'GET',
		dataType: 'json'
	})
	.then(function(weatherForecast){
		// console.log(weatherForecast);

		var currentTempC = weatherForecast.current_observation.temp_c; //Stores current temperature in Celsius
		// console.log(currentTempC);

		var currentTempF = weatherForecast.current_observation.temp_f; //Stores current temperature in Fahrenheit
		// console.log(currentTempF); 

		var weatherDescription = weatherForecast.current_observation.weather; //  Stores description of current weather
		// console.log(weatherDescription);

		var weatherIconUrl = weatherForecast.current_observation.icon_url; // Stores url to current weather .gif 
		// console.log(icon_url);

		startPage.displayWeatherCity(cityName,currentTempC,currentTempF,weatherDescription,weatherIconUrl);

	});
};

// Displays the weather and city on the page
startPage.displayWeatherCity = function(cityName,currentTempC,currentTempF,weatherDescription,weatherIconUrl) {

	// Displays the temperature in Celsius on page
	$('#temp').html(Math.round(currentTempC) + '&deg;C');

	// Changes Celsius to Fahrenheit on click of #Fahrenheit
	$('#fahrenheit').on('click',function() {
		$('#temp').html(Math.round(currentTempF) + '&deg;F');		
	});

	// Changes Fahrenheit to Celsius on click of #Celsius
	$('#celsius').on('click',function() {
		$('#temp').html(Math.round(currentTempC) + '&deg;C');		
	});

	// Displays the weatherIcon on page
	$('#weatherIcon').html('<img src=' + weatherIconUrl + '>');

};

// Gets and displays date info
startPage.todayDate = function() {
	
	var monthNames = [
	  'January', 'February', 'March',
	  'April', 'May', 'June', 'July',
	  'August', 'September', 'October',
	  'November', 'December'];

	var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	var today = new Date(); //Returns full date

	var dayIndex = today.getDay(); //Stores numbered day (Sun(0) - Sat(6))
	
	var monthIndex = today.getMonth(); // Stores month number (0-11)

	var date = today.getDate(); //Stores date (1-31)

	var year = today.getFullYear(); //Stores full year


	// Displays the date sentence in #today 
	$('#today').html(dayNames[dayIndex] + ', ' + monthNames[monthIndex] + ' ' + date);
};

//Get and display time
startPage.time = function() {
	var time = new Date();

	var hour24 = time.getHours(); //Stores hour (0-23)
	var hour12 = ((hour24 + 11) % 12 + 1); //Converts 24hr time to 12hr

	// Creates AM or PM based on hour24 
	var amPm = hour24 >= 12 ? ' p.m.' : ' a.m.'

	// if (hour24 >= 12) {
	// 	var pm = 'PM';
	// 	// console.log(pm);
	// }
	// else {
	// 	var am = 'AM';
	// 	// console.log(am);
	// }

	var min = time.getMinutes(); //Stores minutes (0-59)

	//Converts single digit minutes to have 0 in front
	var digit0 = min <= 9 ? '0' + min : min;

	//Displays time in #time
	$('#time').html(hour12 + ':' + digit0);
	$('#amPm').html(amPm);

	startPage.greeting(hour24);
};

//Displays greeting on page
startPage.greeting = function() {
	var time = new Date();

	var hour24 = time.getHours();
	// console.log(hour24);

	if (hour24 >= 2 && hour24 <= 4) {
		$('#greeting').html('Still awake?');
	}
	else if (hour24 >= 5 && hour24 <= 11) {
		$('#greeting').html('Good Morning!');
	}
	else if (hour24 >= 12 && hour24 <=16) {
		$('#greeting').html('Good Afternoon!');
	}
	else if (hour24 >= 17 && hour24 <= 21) {
		$('#greeting').html('Good Evening!');
	}
	else {
		$('#greeting').html('Good Night!');
	}
};

//Displays quote on the page
startPage.quote = function() {
	var quoteBank = [
		{
			quote: "Be the change that you wish to see in the world.",
			name: "- Mahatma Gandhi"
		},
		{
			quote: "Be yourself; everyone else is already taken.",
			name: "- Oscar Wilde"
		},
		{
			quote: "No one can make you feel inferior without your consent.",
			name: "― Eleanor Roosevelt"
		},
		{
			quote: "It is never too late to be what you might have been.",
			name: "― George Eliot"
		},
		{
			quote: "Everything you can imagine is real.",
			name: "― Pablo Picasso"
		},
		{
			quote: "Nothing is impossible, the word itself says 'I'm possible'!",
			name: "― Audrey Hepburn"
		},
		{
			quote: "Whatever you are, be a good one.",
			name: "― Abraham Lincoln"
		},
		{
			quote: "May you live every day of your life.",
			name: "― Jonathan Swift"
		},
		{
			quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
			name: "― Ralph Waldo Emerson"
		},
		{
			quote: "It always seems impossible until it's done.",
			name: "― Nelson Mandela"
		},
		{
			quote: "Turn your wounds into wisdom.",
			name: "― Oprah Winfrey"
		},
		{
			quote: "Only in the darkness can you see the stars.",
			name: "― Martin Luther King Jr."
		},
		{
			quote: "You never fail until you stop trying.",
			name: "― Albert Einstein"
		},
		{
			quote: "Cowards die a thousand deaths, but the brave only die once.",
			name: "― Ernest Hemingway"
		},
		{
			quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
			name: "― Mahatma Gandhi"
		},
		{
			quote: "I have not failed. I've just found 10,000 ways that won't work.",
			name: "― Thomas A. Edison"
		},
		{
			quote: "Life isn't about finding yourself. Life is about creating yourself.",
			name: "― George Bernard Shaw"
		},
		{
			quote: "Believe you can and you're halfway there.",
			name: "― Theodore Roosevelt"
		},
		{
			quote: "It does not matter how slowly you go as long as you do not stop.",
			name: "― Confucius"
		},
		{
			quote: "Start where you are. Use what you have. Do what you can.",
			name: "― Arthur Ashe"
		},
		{
			quote: "Happiness is not something ready made. It comes from your own actions.",
			name: "― Dalai Lama"
		},
		{
			quote: "What we think, we become.",
			name: "― Buddha"
		},
		{
			quote: "If opportunity doesn't knock, build a door.",
			name: "― Milton Berle"
		},
		{
			quote: "No act of kindness, no matter how small, is ever wasted.",
			name: "― Aesop"
		},
		{
			quote: "We can't help everyone, but everyone can help someone.",
			name: "― Ronald Reagan"
		},
		{
			quote: "The secret of getting ahead is getting started.",
			name: "― Mark Twain"
		},
		{
			quote: "Act as if what you do makes a difference. It does.",
			name: "― William James"
		},
		{
			quote: "The best preparation for tomorrow is doing your best today.",
			name: "― H. Jackson Brown, Jr."
		}
	];

		var randIndex = Math.floor(Math.random() * 29); // Returns random number between 0-28 (There are 29 quotes)  
	
		var randQuote = quoteBank[randIndex]; //Stores a random quote object

		var quote = randQuote.quote; //Stores the quote

		var author = randQuote.name; //Stores the name of the quote's author 

		//Displays quote on page
		$('#quote').html('"' + quote + '"');

		//Displays quote's author on page
		$('#author').html(author);
};

startPage.backgroundImage = function() {
	var today = new Date();

	var dayIndex = today.getDay();

	if (dayIndex === 0) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0.27),rgba(0,0,0,0.27)),url(../images/back1.jpg)');
	}
	else if (dayIndex === 1) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(../images/back2.jpg)');
	}
	else if (dayIndex === 2) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0)),url(../images/back3.jpg)');
	}	
	else if (dayIndex === 3) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0.47),rgba(0,0,0,0.47)),url(../images/back4.jpg)');
	}
	else if (dayIndex === 4) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url(../images/back5.jpg)');
	}
	else if (dayIndex === 5) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url(../images/back6.jpg)');
	}	
	else if (dayIndex === 6) {
		$('body').css('background-image','linear-gradient(rgba(0,0,0,0.35),rgba(0,0,0,0.35)),url(../images/back8.jpg)');
	}	

	// console.log(dayIndex);
};

startPage.init = function() {
	startPage.getLocation();
	startPage.todayDate();
	startPage.time();setInterval(startPage.time,5000);
	startPage.greeting();
	startPage.quote();
	startPage.backgroundImage();
}

$(function() {
	startPage.init();
    // console.log( "ready!" );
});