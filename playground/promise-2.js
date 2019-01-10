const request = require("request");

const geocode = require("../geocode/geocode");

let geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    let encodedAddress = encodeURIComponent(address);
    request(
      {
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=cKpAnOSuCXUwOZx0EAsumG7G7IhL97G3&location=${encodedAddress}`,
        json: true
      },
      (err, response, body) => {
        if (err) {
          reject("Unable to connect to the service.");
        } else if (body.results.length === 0) {
          reject("Unable to find that address.");
        } else {
          let latitude = body.results[0].locations[0].latLng.lat;
          let longitude = body.results[0].locations[0].latLng.lng;
          resolve({
            latitude,
            longitude
          });
        }
      }
    );
    /*geocode.geocodeAddress(address, (errorMessage, results) => {
            if(results){
                resolve(results);
            }else{
                reject(errorMessage);
            }
        });*/
  });
};

geocodeAddress("19146").then(
  location => {
    console.log(JSON.stringify(location, undefined, 2));
  },
  errorMessage => {
    console.log(errorMessage);
  }
);
