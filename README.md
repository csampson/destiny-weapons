# Weapons of Destiny

A web app that lists data for legendary and exotic Destiny 2 weapons.

## Goals & Progress

Weapon data for Destiny 2 is scattered throughout the web - it's a bit of a pain to piece together the different bits of information (location, frame, stats, etc.) from all the lists and wikis out there.

I wanted to build a single app that handles **all** the following:

- [x] Clean, easy to digest layout   
- [x] Responsive UI (i.e. works well on large and small screens)   
- [x] Lists weapon frames (e.g "Lightweight")   
- [ ] Lets you search for weapons with specific perks (e.g. "High-caliber Rounds")   
- [ ] Lets you easily compare two or more weapons   
- [ ] Lists weapon locations/vendors

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
