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

function createSellFilter(sells) {
    const filters = {
        "organic items": "organic",
        "baked goods": "bakedGoods",
        "cheese": "cheese",
        "crafts": "crafts",
        "flowers": "flowers",
        "eggs": "eggs",
        "seafood": "seafood",
        "herbs": "herbs",
        "vegetables": "vegetables",
        "honey": "honey",
        "jam": "jams",
        "maple syrup": "maples",
        "meat": "meat",
        "nuts": "nuts",
        "poultry": "poultry",
        "soap": "soap",
        "coffee": "coffee",
        "beans": "beans",
        "fruit": "fruit",
        "grains": "grains",
        "mushrooms": "mushrooms"
    };

    if (!filters[sells]) {
        return function () {
            return false;
        };
    }

    return function (item) {
        return item.sells[filters[sells]];
    };
}

exports.getLocationByCity = getLocationByCity;
exports.getMarketsByLocation = getMarketsByLocation;
exports.createSellFilter = createSellFilter;