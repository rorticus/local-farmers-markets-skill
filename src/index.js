const Alexa = require('alexa-sdk');
const api = require('./api');

const handlers = {
    'FindMarketsNearMe'() {
        const city = this.event.request.intent.slots.City.value;
        const filter = this.event.request.intent.slots.Sells.value;

        api.getLocationByCity(city)
            .then(location => {
                if (!location) {
                    this.emit(':tell', 'I\'m sorry but I don\'t know where ' + city + ' is.');
                } else {
                    return api.getMarketsByLocation(location.lat, location.lon)
                        .then(markets => {
                            if (filter) {
                                markets = markets.filter(api.createSellFilter(filter));
                            }

                            if (!markets || markets.length === 0) {
                                this.emit(':tell', `I'm sorry but I can't find any farmers markets within 15 miles of ${city}`);
                            } else {
                                const word = markets.length === 1 ? 'market' : 'markets';
                                const firstMarket = markets[0];

                                const lines = [];
                                const cardContent = [];

                                let line = `<s>I found ${markets.length} ${word} near ${city}`;

                                if (filter) {
                                    line += ` that sell ${filter}.`;
                                }

                                line += '</s>';

                                lines.push(line);
                                lines.push(`<s>The closest one at ${formatMiles(firstMarket.distance)} away is ${firstMarket.name}</s>`);

                                markets.forEach(market => {
                                    cardContent.push(`${market.name} - ${formatMiles(market.distance)}`);
                                    cardContent.push(buildAddress(market.address));
                                    cardContent.push('');
                                });

                                cardContent.join(`<s>Check the Alexa app for more details.</s>`);

                                this.emit(':tellWithCard', lines.join('\n'), `Farmers Markets near ${city}`, cardContent.join("\n"));
                            }
                        });
                }
            });
    },
    'AMAZON.HelpIntent'() {
        this.emit(':tell', `
        <p>
            <s>Look for farmers markets in any city in the US. Try saying, ask local farmers markets for markets near Asheville, North Carolina.</s>
            <s>The closest market will be spoken and the addresses of all available farmers markets will be added to the Alexa app.</s>
        </p>
        `);
    }
};

function buildAddress(parts) {
    const address = [];

    if (parts.street) {
        address.push(parts.street);
    }

    if (parts.city && parts.state && parts.zip) {
        address.push(`${parts.city} ${parts.state}, ${parts.zip}`);
    }

    return address.join(", ");
}

function formatMiles(miles) {
    const rounded = Math.round(miles * 10) / 10;

    if (rounded === 1) {
        return '1 mile';
    } else {
        return `${rounded} miles`;
    }
}

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
