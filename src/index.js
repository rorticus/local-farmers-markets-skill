const Alexa = require('alexa-sdk');
const api = require('./api');

var handlers = {
    'FindMarketsNearMe': function () {
        const city = this.event.request.intent.slots.City.value;

        api.getLocationByCity(city)
            .then(location => {
                if (!location) {
                    this.emit(':tell', 'I\'m sorry but I don\'t know where ' + city + ' is.');
                } else {
                    return api.getMarketsByLocation(location.lat, location.lon)
                        .then(markets => {
                            if(!markets || markets.length == 0) {
                                this.emit(':tell', `I'm sorry but I can't find any farmers markets near ${city}`);
                            } else {
                                const word = markets.length == 1 ? 'market' : 'markets';
                                const firstMarket = markets[0];

                                this.emit(':tell', `I found ${markets.length} ${word} near ${city}.
                                The closest one at ${formatMiles(firstMarket.distance)} away is ${firstMarket.name}`);
                            }
                        });
                }
            });
    }
};

function formatMiles(miles) {
    var rounded = Math.round(miles * 10) / 10;

    if(rounded === 1) {
        return '1 mile';
    } else {
        return `${rounded} miles`;
    }
}

exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
}
