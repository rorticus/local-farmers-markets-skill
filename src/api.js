const fetch = require('node-fetch');

function getLocationByCity(city) {
    return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(city))
        .then(res => res.json())
        .then(results => {
            if (results && results.results && results.results.length > 0) {
                return {
                    lat: results.results[0].geometry.location.lat,
                    lon: results.results[0].geometry.location.lng
                }
            }
            else {
                return null;
            }
        });
}

function getMarketsByLocation(latitude, longitude) {
    return fetch(`http://www.localfarmersmarketsapp.com/api/markets/?lat=${latitude}&lon=${longitude}`)
        .then(res => res.json());
}

exports.getLocationByCity = getLocationByCity;
exports.getMarketsByLocation = getMarketsByLocation;