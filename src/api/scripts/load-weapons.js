/**
 * @overview Loads static weapon JSON data into Redis
 */

'use strict'

const Weapons = require('../models/weapons')

const zoomLevels = new Map()
  .set(0, 'short')
  .set(1, 'short')
  .set(2, 'short')
  .set(3, 'medium')
  .set(4, 'medium')
  .set(5, 'long')

function serialize (weapon) {
  const record = {
    'name': weapon.name,
    'category': weapon.category,
    'damage_type': weapon.damage_type,
    'description': weapon.description,
    'icon': weapon.icon,
    'tier': weapon.tier
  }

  let maxZoom = null

  // Add stat properties, e.g. `stat_range`
  Object.entries(weapon.stats).forEach(([name, block]) => {
    record[`stat_${name}`] = block.maximum
  })

  const scopes = weapon.sockets.find(socket => (
    socket.type && socket.type.name === 'scopes'
  ))

  if (scopes) {
    scopes.plugItems.forEach(scope => {
      const zoom = scope.modifiers.find(m => m.stat === 'zoom').value

      if (!maxZoom || zoom > maxZoom) {
        maxZoom = zoom
      }
    })
  }

  if (maxZoom !== null) {
    record.max_zoom = zoomLevels.get(maxZoom) || 'long'
  }

  return record
}

async function start () {
  try {
    const weapons = await Weapons.list()
    const output = weapons.map(serialize)

    await Weapons.save(JSON.stringify(output))
  } catch (error) {
    console.error('ERROR: Failed to load weapons:', error)
    return Promise.reject(error)
  }

  return Promise.resolve()
}

start()
  .then(() => {
    console.info(`Successfully saved data.`)
    process.exit(0)
  }).catch(() => {
    process.exit(1)
  })
