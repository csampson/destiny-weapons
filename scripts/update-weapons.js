/**
 * @overview Hits Bungie API to grab weapon and related manifests
 */

'use strict'

const fs = require('fs')
const path = require('path')
const pick = require('lodash/pick')
const snakeCase = require('lodash/snakeCase')
const Destiny = require('../lib/destiny')

const weaponHashes = require('../data/weapon-hashes')

const Library = {
  damageTypes: new Map(),
  plugItems: new Map(),
  socketTypes: new Map(),
  stats: new Map(),

  defineDamageType (hash) {
    if (!Number.isInteger(hash)) {
      throw new Error('Invalid `hash` value for `Library::defineDamageType`')
    }

    if (this.damageTypes.has(hash)) {
      return
    }

    return Destiny.Manifest
      .fetch('DestinyDamageTypeDefinition', hash)
      .then(({ Response }) => {
        this.damageTypes.set(hash, {
          name: Response.displayProperties.name,
          description: Response.displayProperties.description,
          icon: Response.displayProperties.icon,
          icon_transparent: Response.transparentIconPath
        })
      })
  },

  defineStat (hash) {
    if (!Number.isInteger(hash)) {
      throw new Error('Invalid `hash` value for `Library::defineStat`')
    }

    if (this.stats.has(hash)) {
      return
    }

    return Destiny.Manifest
      .fetch('DestinyStatDefinition', hash)
      .then(({ Response }) => {
        this.stats.set(hash, {
          name: snakeCase(Response.displayProperties.name),
          label: Response.displayProperties.name,
          description: Response.displayProperties.description,
          icon: Response.displayProperties.icon,
          icon_transparent: Response.transparentIconPath
        })
      })
  },

  defineSocketType (hash) {
    if (!Number.isInteger(hash)) {
      throw new Error('Invalid `hash` value for `Library::defineSocketType`')
    }

    if (this.socketTypes.has(hash)) {
      return
    }

    return Destiny.Manifest
      .fetch('DestinySocketTypeDefinition', hash)
      .then(({ Response }) => {
        const name = Response.plugWhitelist[0].categoryIdentifier

        // Ignore undesirable socket types, such as "v300.weapon.damage_type.energy" or "shader"
        if (!/^v300|shader|skins/.test(name)) {
          this.socketTypes.set(hash, {
            name
          })
        }
      })
  },

  definePlugItem (hash) {
    if (!Number.isInteger(hash)) {
      throw new Error('Invalid `hash` value for `Library::definePlugItem`')
    }

    if (this.plugItems.has(hash)) {
      return
    }

    return Destiny.Manifest
      .fetch('DestinyInventoryItemDefinition', hash)
      .then(({ Response }) => {
        this.plugItems.set(hash, {
          name: snakeCase(Response.displayProperties.name),
          label: Response.displayProperties.name,
          description: Response.displayProperties.description,
          icon: Response.displayProperties.icon,
          modifiers: Response.investmentStats
            .filter((stat) => (
              // Ignore unknown stats
              this.stats.has(stat.statTypeHash)
            ))
            .map((stat) => ({
              stat: this.stats.get(stat.statTypeHash).name,
              value: stat.value
            }))
        })
      })
  }
}

function getWeaponManifest (hash) {
  return Destiny.Manifest
    .fetch('DestinyInventoryItemDefinition', hash)
    .then(({ Response }) => ({
      attrs: {
        name: Response.displayProperties.name,
        description: Response.displayProperties.description,
        icon: `https://www.bungie.net${Response.displayProperties.icon}`,
        screenshot: `https://www.bungie.net${Response.screenshot}`,
        tier: snakeCase(Response.inventory.tierTypeName),
        category: snakeCase(Response.itemTypeDisplayName)
      },
      references: {
        damage_type: Response.defaultDamageTypeHash,
        stats: Response.stats.stats,
        sockets: Response.sockets.socketEntries.filter(entry => entry.socketTypeHash !== 0)
      }
    }))
}

const Weapons = {
  records: [],
  lookup: async (name, hash) => {
    const weapon = {}
    console.log(`Fetching data for: ${name} ...`)

    try {
      const hash = weaponHashes[name]
      const data = await getWeaponManifest(hash)

      // Ensure damage type is defined
      await Library.defineDamageType(data.references.damage_type)

      // Ensure stats are defined
      await Promise.all(Object.keys(data.references.stats).map(hash => (
        Library.defineStat(Number(hash))
      )))

      // Ensure sockets are defined
      await Promise.all(data.references.sockets.map(async ({ reusablePlugItems, socketTypeHash }) => {
        await Library.defineSocketType(socketTypeHash)

        await Promise.all(reusablePlugItems.map(({ plugItemHash }) => (
          Library.definePlugItem(plugItemHash)
        )))
      }))

      weapon.damage_type = snakeCase(
        Library.damageTypes.get(data.references.damage_type).name
      )

      weapon.stats = Object.values(data.references.stats)
        .filter(stat => (
          // Ignore unknown stats or stats with empty-string for `name`
          Library.stats.has(stat.statHash) && Library.stats.get(stat.statHash).name
        ))
        .sort((a, b) => (
          // Sort attributes alphabetically by name
          Library.stats.get(a.statHash).name < Library.stats.get(b.statHash).name
            ? -1
            : 1
        ))
        .reduce((block, stat) => {
          block[Library.stats.get(stat.statHash).name] = pick(stat, ['value', 'minimum', 'maximum'])
          return block
        }, {})

      weapon.sockets = data.references.sockets.map(socket => ({
        type: Library.socketTypes.get(socket.socketTypeHash),
        plugItems: socket.reusablePlugItems.map(({ plugItemHash }) => (
          Library.plugItems.get(plugItemHash)
        ))
      }))

      Weapons.records.push({ ...data.attrs, ...weapon })
    } catch (error) {
      console.error(`Failed to import data for "${name}":`)
      console.error(error)
    }
  }
}

Object.entries(weaponHashes).reduce((prev, [ name, hash ]) => (
  prev.then((data) => (
    Weapons.lookup(name, hash)
  ))
 ), Promise.resolve()).then(() => {
   const exportPath = path.join(__dirname, '../data/weapons.json')

   console.log(`Dumping to ${exportPath} ...`)
   fs.writeFileSync(exportPath, JSON.stringify(Weapons.records))
   console.log(`Sucessfully imported data for all ${Weapons.records.length} weapons.`)
 })
