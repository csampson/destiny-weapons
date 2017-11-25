/**
 * @overview Loads static weapon JSON data into Redis
 */

'use strict'

const redis = require('redis')
const snakeCase = require('lodash/snakeCase')
const sortBy = require('lodash/sortBy')

const client = redis.createClient()
const weapons = require('../data/weapons')

const operations = []

function indexWeapon (key, score) {
  return new Promise((resolve, reject) => {
    client.zadd('weapon.id', score, key, (error, reply) => {
      if (error) {
        reject(error)
      } else {
        resolve(reply)
      }
    })
  })
}

/** @todo Revise weapon data structure to support complete searchability/filtering */
function loadWeapon (key, weapon) {
  return new Promise((resolve, reject) => {
    client.hmset(key, {
      name: weapon.name,
      description: weapon.description,
      icon: weapon.icon,
      screenshot: weapon.screenshot,
      tier: weapon.tier,
      category: weapon.category,
      damage_type: weapon.damage_type,
      stats: JSON.stringify(weapon.stats)
    }, (error, reply) => {
      if (error) {
        reject(error)
      } else {
        resolve(reply)
      }
    })
  })
}

console.info('Loading weapon data into Redis...')

// Load each weapon record into Redis
sortBy(weapons, 'name').forEach((weapon, index) => {
  const key = `weapon:${snakeCase(weapon.name)}`

  operations.push(
    loadWeapon(key, weapon),
    indexWeapon(key, index)
  )
})

Promise.all(operations)
  .then(() => {
    console.info('Done.')
    process.exit(0)
  })
  .catch(error => {
    console.error(`Error occurred while loading weapon data into Redis:`)
    console.error(error)
    process.exit(1)
  })
