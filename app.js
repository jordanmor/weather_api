const weather = require('./weather');
const query = process.argv.slice(2).join("_").replace(' ', '_');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('');

const queryMessage = 
`Enter location in any the following formats:
Zipcode       (ex. 90210)
City, State   (ex. Cleveland OH)
City, Country (ex. London England)

Enter location:`;

rl.question(queryMessage, (location) => {
  console.log('');
  weather.get(location);
  rl.close();
});