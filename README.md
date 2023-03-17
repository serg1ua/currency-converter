# Currency Converter

## Environment

* Create .env, .env.production files in root directory

```shell
  NODE_ENV=dev # production
  PORT=3000
  RAPIDAPI_KEY=<rapidapi_key>
  RAPIDAPI_URL=https://currency-converter5.p.rapidapi.com/currency
  RAPIDAPI_HOST=currency-converter5.p.rapidapi.com
  SERVICE_EMAIL=<service@email.com>
  GOOGLE_EMAIL=<example@gmail.com>
  GOOGLE_CLIENT_ID=<client_id>
  GOOGLE_CLIENT_SECRET=<client_secret>
  GOOGLE_REFRESH_TOKEN=<refresh_token>
  GOOGLE_OAUTH_REDIRECT_URL=<redirect_url>
```

## Run locally

```shell
npm i
npm run start:dev
```

Navigate to <http://localhost:3000/api> to use Swagger

## Production in Docker

Run:

```shell
npm run start
```

Stop:

```shell
npm run stop
```

Request URL is <http://localhost:3000>

## Request body example

```json
{
  "amount": 10,
  "from": "USD",
  "to": "UAH",
  "email": "string@gmail.com"
}
```

Notice: "to" property can be one currency code like "UAH", or comma separated string of currency codes: "UAH, PLN, EUR"
