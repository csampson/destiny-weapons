/**
 * @overview Loads static weapon JSON data into Redis
 */

'use strict'

const snakeCase = require('lodash/snakeCase')
const Database = require('../lib/database')
const weapons = require('../data/weapons')

const db = new Database()

const zoomLevels = new Map()
  .set(0, 'short')
  .set(1, 'short')
  .set(2, 'short')
  .set(3, 'medium')
  .set(4, 'medium')
  .set(5, 'long')

function createIndex () {
  return db.execute('FT.CREATE', [
    'weapons',
    'SCHEMA',
    'name', 'TEXT', 'SORTABLE',
    'category', 'TEXT', 'SORTABLE',
    'damage_type', 'TEXT', 'SORTABLE',
    'description', 'TEXT', 'NOINDEX',
    'icon', 'TEXT', 'NOINDEX',
    'max_zoom', 'TEXT', 'SORTABLE',
    'stat_aim_assistance', 'NUMERIC', 'SORTABLE',
    'stat_ammo_capacity', 'NUMERIC', 'SORTABLE',
    'stat_attack', 'NUMERIC', 'SORTABLE',
    'stat_blast_radius', 'NUMERIC', 'SORTABLE',
    'stat_charge_time', 'NUMERIC', 'SORTABLE',
    'stat_defense', 'NUMERIC', 'SORTABLE',
    'stat_efficiency', 'NUMERIC', 'SORTABLE',
    'stat_handling', 'NUMERIC', 'SORTABLE',
    'stat_impact', 'NUMERIC', 'SORTABLE',
    'stat_magazine', 'NUMERIC', 'SORTABLE',
    'stat_power', 'NUMERIC', 'SORTABLE',
    'stat_range', 'NUMERIC', 'SORTABLE',
    'stat_recoil_direction', 'NUMERIC', 'SORTABLE',
    'stat_reload_speed', 'NUMERIC', 'SORTABLE',
    'stat_rounds_per_minute', 'NUMERIC', 'SORTABLE',
    'stat_stability', 'NUMERIC', 'SORTABLE',
    'stat_swing_speed', 'NUMERIC', 'SORTABLE',
    'stat_velocity', 'NUMERIC', 'SORTABLE',
    'stat_zoom', 'NUMERIC', 'SORTABLE',
    'tier', 'TEXT', 'SORTABLE',
    'type', 'TEXT', 'SORTABLE'
  ])
}

function loadWeapon (key, weapon) {
  const fields = [
    'name', weapon.name,
    'category', weapon.category,
    'damage_type', weapon.damage_type,
    'description', weapon.description,
    'icon', weapon.icon,
    'tier', weapon.tier
  ]

  let maxZoom = null

  // Add stat properties, e.g. `stat_range`
  Object.entries(weapon.stats).forEach(([name, block]) => {
    fields.push(`stat_${name}`, block.maximum)
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
    fields.push('max_zoom', zoomLevels.get(maxZoom) || 'long')
  }

  /** @todo Add perks */
  return db.execute('FT.ADD', [
    'weapons', snakeCase(weapon.name), 1, 'FIELDS'
  ].concat(fields))
}

async function start () {
  console.info(':: Creating indexes...')

  try {
    await createIndex()
  } catch (error) {
    console.error('ERROR: Failed to create indexes: \n', error)
    return Promise.reject(error)
  }

  console.info(':: Loading weapon data...')

  try {
    // Load each weapon record into Redis
    await Promise.all(weapons.map((weapon) => {
      const key = `weapon:${snakeCase(weapon.name)}`
      return loadWeapon(key, weapon)
    }))
  } catch (error) {
    console.error('ERROR: Failed to load weapons:', error)
    return Promise.reject(error)
  }

  return Promise.resolve()
}

start()
  .then(() => {
    console.info(`Successfully loaded ${weapons.length} weapons into redis.`)
    process.exit(0)
  }).catch(() => {
    process.exit(1)
  })
