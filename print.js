module.exports = {
	// Print out temp details
	weather: function(weather) {
	    const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}°F`;
	    console.log(message);
	},
	// Print out error message
	error: function(error) {
	    console.error(error.message);
	}
};