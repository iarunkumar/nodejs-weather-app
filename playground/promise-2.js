const request = require('request');

var geocodeAddress = (address) => {
    // return promise with resolve and reject
    return new Promise((resolve, reject) =>{
        var encodedAddress = encodeURIComponent(address);
        // request by default doesn't support promises
        // here we wrap the request function call inside a promise
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            if (error) {            
                reject('Unable to connect to Google servers');
            }
            else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address');
            }
            else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
    
};

geocodeAddress('Blanchardstown').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});