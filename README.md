## Set Up

Invocation Name: `local farmer's markets`

## Intent Schema

```json
{
  "intents": [
    {
      "slots": [
        {
          "name": "City",
          "type": "AMAZON.AdministrativeArea"
        }
      ],
      "intent": "FindMarketsNearMe"
    }
  ]
}
```

## Sample Utterances

```
FindMarketsNearMe to find the farmers markets near me
FindMarketsNearMe to find farmers markets in {City}
FindMarketsNearMe to find farmers markets near {City}
```