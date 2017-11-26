'use strict'

const express = require('express')
const graphqlHTTP = require('express-graphql')

const Weapon = require('./models/weapon')
const weaponsSchema = require('./schemas/weapons')
const app = express()

const root = {
  weapons: () => {
    return Weapon.list()
  }
}

app.use('/graphql', graphqlHTTP({
  rootValue: root,
  schema: weaponsSchema,
  graphiql: true
}))

app.listen(3000)
