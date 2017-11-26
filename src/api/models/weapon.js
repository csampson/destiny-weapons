/**
 * @overview Interface for weapon records in the database
 */

'use strict'

const redis = require('redis')
const client = redis.createClient()

const Weapon = {
  list () {
    return new Promise((resolve, reject) => {
      client.zrange('weapon.id', 0, -1, (error, ids) => {
        if (error) {
          reject(error)
        }

        const fetch = client.multi()

        ids.forEach(id => {
          fetch.hgetall(id)
        })

        fetch.exec((error, weapons) => {
          if (error) {
            reject(error)
          }

          resolve(weapons)
        })
      })
    })
  }
}

module.exports = Weapon
