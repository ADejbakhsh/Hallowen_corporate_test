# Hallowen_corporate_test
L'objectif général consiste à élaborer une API en utilisant Node.js, disposant d'une unique voie de communication qui accepte en entrée le nom d'une entreprise française et retourne en format JSON son numéro de téléphone, obtenu à partir d'une source web sélectionnée à votre convenance.


## Usage
This service allow you to get the phone number of a french company.
To make a request use "/getFrenchCompanyNumber" path
specify the name of the company and optionally the address and siren.

exemple : /getFrenchCompanyNumber?adress=$adress&siren=$siren&name=$company_name

It will return the phone number of the company or an error message in Json format.


## Installation

```bash
$ npm install
```
You will also need to create a .env file at the root folder with the key passed in the mail
```
SERP_API_KEY=<The key>
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
