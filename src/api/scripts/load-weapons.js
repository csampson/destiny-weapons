/**
 * @overview Loads static weapon JSON data into Redis
 */

'use strict'

const redis = require('redis')
const snakeCase = require('lodash/snakeCase')
const sortBy = require('lodash/sortBy')

const client = redis.createClient()
const weapons = require('../data/weapons')

const zoomLevels = new Map()
  .set(0, 'short')
  .set(1, 'short')
  .set(2, 'short')
  .set(3, 'medium')
  .set(4, 'medium')
  .set(5, 'long')

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
  const stats = {}
  const perks = []
  const weaponZoomLevels = []

  // Add stat properties, e.g. `stat_range`
  Object.entries(weapon.stats).forEach(([name, block]) => {
    stats[`stat_${name}`] = block.maximum
  })

  // Add perk properties, e.g. `perk_lightweight_frame`
  weapon.sockets.forEach(socket => {
    if (!socket.type) {
      return
    }

    socket.plugItems.forEach(item => {
      perks.push(item.name)

      // Grab zoom level (0-2 = short; 3-4 = medium; 5+ = long)
      if (socket.type.name === 'scopes') {
        const zoomValue = item.modifiers.find(m => m.stat === 'zoom').value
        const zoomLevel = zoomLevels.get(zoomValue) || 'long'

        weaponZoomLevels.push(zoomLevel)
      }
    })
  })

  return new Promise((resolve, reject) => {
    client.hmset(key, {
      name: weapon.name,
      icon: weapon.icon,
      tier: weapon.tier,
      type: weapon.category,
      damage_type: weapon.damage_type,
      perks: JSON.stringify(perks),
      zoom_levels: JSON.stringify([...new Set(weaponZoomLevels)]), // de-dupe via `Set`
      ...stats
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
