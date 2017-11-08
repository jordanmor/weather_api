const http = require('http');
const https = require('https');
const print = require('./print');
const api = require('./api.json');

function get(query) {
    // Take out underscores for readability
    const readableQuery = query.replace('_', ' ');
    try {
        const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
            if (response.statusCode === 200) {
                let body = "";
                // Read the data
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    try {
                        // Parse the data
                        const weather = JSON.parse(body);
                        // Check if the location was found before printing
                        if (weather.location) {
                            // Print the data
                            print.weather(weather);
                        } else {
                            const queryError = new Error(`The location "${readableQuery}" was not found.`);
                            print.error(queryError);
                        }
                    } catch (error) {
                        // Parse Error
                        print.error(error);
                    }
                });
            } else {
                // Status Code Error
                const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
                print.error(statusCodeError);
            }

        });

        request.on("error", print.error);
    } catch (error) {
        //Malformed URL Error
        print.error(error);
    }
}

module.exports.get = get;