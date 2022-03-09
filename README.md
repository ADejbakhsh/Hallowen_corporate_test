# october_test
L’idée globale : créer une API en Node.js, avec une seule route qui prend en paramètre le nom d’une entreprise française, et qui renvoie en JSON son numéro de téléphone, trouvé sur le web par les moyens de ton choix.


This service allow you to get the phone number of a french company.
To make a request use "/getFrenchCompanyNumber" path
specify the name of the company and optionally the address and siren.

exemple : /getFrenchCompanyNumber?name=$company_name&adress=$adress&siren=$siren

It will return the phone number of the company or an error message in Json format.


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
