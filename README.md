# Local Farmers Markets Skill
This is a sample Alexa skill that uses Google's geocoding service as well as the API from http://www.localfarmersmarkets.com to provide the user with a list of farmers markets near them.

This skill has a two intent, `FindMarketsNearMe` which can search for markets within 15 miles of the specified city, optionally filtering the results by what the user wants, and `AMAZON.HelpIntent` which automatically responds to help requests.

## Installation

Clone this repository and:

```shell
$ npm i
```

If you are running this on AWS Lambda, run `npm run zip` and upload the `local-markets-skill.zip` that is created in the current directory.

## Dashboard Setup

### Set Up

Invocation Name: `local farmer's markets`

### Intent Schema

```json
{
  "intents": [
    {
      "slots": [
        {
          "name": "City",
          "type": "AMAZON.AdministrativeArea"
        },
        {
          "name": "Sells",
          "type": "SELL_ITEM_LIST"
        }
      ],
      "intent": "FindMarketsNearMe"
    },
    {
      "intent": "AMAZON.HelpIntent"
    }
  ]
}
```

### Slots

`SELL_ITEM_TYPE`
```
organic items
baked goods
cheese
crafts
flowers
eggs
seafood
herbs
vegetables
honey
jam
maple syrup
meat
nuts
poultry
soap
coffee
beans
fruit
grains
mushrooms
```

### Sample Utterances

```
FindMarketsNearMe for markets near {City}
FindMarketsNearMe for farmers markets in {City}
FindMarketsNearMe for farmers markets near {City}
FindMarketsNearMe for markets in {City} that sell {Sells}
FindMarketsNearMe for markets in {City} that offer {Sells}
FindMarketsNearMe for markets near {City} that sell {Sells}
FindMarketsNearMe for markets near {City} that offer {Sells}
FindMarketsNearMe for farmers markets in {City} that sell {Sells}
FindMarketsNearMe for farmers markets in {City} that offer {Sells}
FindMarketsNearMe for farmers markets near {City} that sell {Sells}
FindMarketsNearMe for farmers markets near {City} that offer {Sells}
```
