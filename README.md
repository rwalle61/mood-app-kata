# Node React Starter App

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Acknowledgments](#acknowledgments)

## Overview

This is a starter web app I've put together from what I think is currently a good setup.

- Node.js backend
- React frontend
- Integration, component and unit tests setup
- OpenAPI 3 spec
- Eslint
- VSCode debugger
- Husky git hooks

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.com:rwalle61/nodeReactStarterApp.git
```

Install dependencies

```bash
yarn install
```

### Run the app

```bash
yarn build

yarn start
```

The app will be running at `http://localhost:9100`.

Alternatively, you can run `yarn start` from

- `/server` to start only the server
- `/client` to start only the client

### Run the app in development mode

Run `yarn start:dev` from the root directory to start both the client and server in 'hot-restart' mode. Editing the client code will restart the client; editing the server code will restart the server

The client app will be running at `http://localhost:3000`.

The server will be running at `http://localhost:9100`.

## Running the Tests

### All tests

```bash
yarn test:full
```

Run this from the root directory to run integration and component tests for both the client and server.

### End-to-end tests

We use [Cypress](https://www.cypress.io/) to perform client-server integration tests. Cypress manipulates our client, checking that calling the server's API renders the correct components.

If the app is already running, run these tests via the following command:

```bash
# With Cypress UI
yarn cypress:open

# Without Cypress UI, in command line
yarn cypress:run
```

If the app is not already running, use the following command to start the app, run the integration tests, then clean up:

```bash
yarn test:integration
```

### Component tests

These do not require the app to be running.

#### Client

We use [Jest](https://jestjs.io/) to test that the client's components render correctly.

```bash
cd client

# Run all component tests
jest

# Run all component tests in watch mode
jest --watch
```

#### Server

We use [Jest](https://jestjs.io/) to test our server's APIs.

```bash
cd server

# Run all API tests
yarn test

# Run all API tests and generate coverage report
yarn test:coverage
```
