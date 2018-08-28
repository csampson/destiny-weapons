/**
 * @overview Provides interface for weapon JSON data
 */

'use strict'

const fs = require('fs')
const memoize = require('lodash/memoize')
const path = require('path')
const util = require('util')

const READ_PATH = path.join(__dirname, '../data/weapons.bungie.json')
const WRITE_PATH = path.join(__dirname, '../data/weapons.json')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const Weapons = {
  async list () {
    try {
      const records = await readFile(READ_PATH)
      return JSON.parse(records)
    } catch (error) {
      console.error(`Weapons::list failed to read weapon records from ${READ_PATH}:`)
      throw error
    }
  },

  async save (records) {
    try {
      await writeFile(WRITE_PATH, records)
    } catch (error) {
      console.error(`Weapons::save failed to save weapon records to ${WRITE_PATH}:`)
      throw error
    }
  }
}

Weapons.list = memoize(Weapons.list)

module.exports = Weapons
