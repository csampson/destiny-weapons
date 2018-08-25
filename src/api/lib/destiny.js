/**
 * @overview Bungie API interface via Swagger
 * @see {@link https://github.com/Bungie-net/api}
 */

const API_KEY = process.env.BUNGIE_API_KEY

const axios = require('axios')
const client = axios.create({
  baseURL: 'https://www.bungie.net/Platform/Destiny2',
  headers: { 'X-Api-Key': API_KEY }
})

/** @todo Handle errors more aggressively */
const fetch = (url) => (
  client.get(url)
    .then(response => response.data)
    .catch(console.error)
)

const Destiny = {
  Armory: {
    async search (type, query) {
      return fetch(`Armory/Search/${type}/${query}`)
    }
  },

  Manifest: {
    async fetch (type, id) {
      return fetch(`Manifest/${type}/${id}`)
    }
  }
}

module.exports = Destiny
