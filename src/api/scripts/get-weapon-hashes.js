/**
 * @overview Hits Bungie API to search for weapons by name and grab their hashes
 */

'use strict'

const fs = require('fs')
const path = require('path')

const Destiny = require('../lib/destiny')
const names = require('../data/weapon-names.json')

const weaponHashes = {}

const lookups = names.map(name => {
  return Destiny.Armory.search('DestinyInventoryItemDefinition', name)
    .then(response => {
      if (!response.Response) {
        console.warn(`Unknown error while fetching record for weapon "${name}"`)
        return
      }

      const records = response.Response.results

      if (records.totalResults > 1) {
        console.warn(`Encountered multiple records for weapon "${name}": ${records.results.map(r => r.hash)} - skipping`)
      } else if (records.totalResults === 0) {
        console.warn(`No records for weapon "${name}"`)
      } else {
        weaponHashes[name] = records.results[0].hash
      }
    })
})

Promise.all(lookups)
  .then(() => {
    const exportPath = path.join(__dirname, '../data/weapon-hashes.json')

    console.log(`Dumping to ${exportPath} ...`)
    fs.writeFileSync(exportPath, JSON.stringify(weaponHashes))
    console.log(`Sucessfully imported data for ${Object.keys(weaponHashes).length}/${names.length} weapons.`)
  })
  .catch(err => {
    console.error('Encountered an error while fetching weapon hashes:')
    console.error(err)
  })
