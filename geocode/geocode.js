const request = require('request');

let geocodeAddress = (address,callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=cKpAnOSuCXUwOZx0EAsumG7G7IhL97G3&location=${encodedAddress}`,
        json: true
    }, (err, response, body) => {
        if(err){
            callback('Unable to connect to the service.');
        }else if(body.results.length === 0){
            callback('Unable to find that address.');
        }else{
            let latitude = body.results[0].locations[0].latLng.lat;
            let longitude = body.results[0].locations[0].latLng.lng;
            callback(undefined, {
                latitude,
                longitude
            });
        }
    });
}

module.exports.geocodeAddress = geocodeAddress;
