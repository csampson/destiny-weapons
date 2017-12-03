# Weapons of Destiny

A web app that lists data for legendary and exotic Destiny 2 weapons.

## Stack

**Node.js** – The platform   
**Express** – Server-side framework   
**GraphQL** - API query interface  

\---

**React** – UI library   
**Redux** - UI state container/manager   
**Apollo** - GraphQL API client library

\---

**Webpack** – Front-end code bundler and build tool   
**Babel** – ESNext transpiler   
**Jest** – Test framework

## Requirements

- Node.js 8.x
- npm 5.x

## Getting Started

- Run `npm install`
- Start the Node.js backend via `npm run start:api` (listens on port `3000`)
- Start Webpack dev server via `npm run start:ui` (listens on port `8080`)
- Navigate to [http://localhost:8080](http://localhost:8080) to load the (frontend) app

## Development

Here's a breakdown of the directory structure:

```
dist/ # Build files will spawn here
src/ # App source code
  api/ # Express + GraphQL API code
  ui/ # React code
test/ # Unit/integration test setup files
```

Unit and integration tests can be run via `npm test`   

## Updating Weapon Data

TODO
