
const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=cKpAnOSuCXUwOZx0EAsumG7G7IhL97G3&location=${encodedAddress}`

axios.get(geocodeUrl)
.then((response) => {
    if(response.data.results.length < 1){
        throw new Error('Unable to find that address');
    }
    const key = 'ea273dfc2e5c45068346ea37707f6e09';
    let lat = response.data.results[0].locations[0].latLng.lat;
    let lng = response.data.results[0].locations[0].latLng.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    return axios.get(weatherUrl);
})
.then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
})
.catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }else{
        console.log(e.message);
    }
});


