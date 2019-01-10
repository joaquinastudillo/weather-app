const request = require('request');

let getWeather = (lat, lng, callback) => {
    const key = 'ea273dfc2e5c45068346ea37707f6e09';
    request({
        url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
        json: true
    }, (err, response, body) => {
        if(!err && response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else{
            callback('Unable to fetch weather.')
        }
    });
}

module.exports.getWeather = getWeather;
