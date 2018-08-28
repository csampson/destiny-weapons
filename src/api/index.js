'use strict'

const cors = require('cors')
const express = require('express')
const graphqlHTTP = require('express-graphql')

const Weapons = require('./models/weapons')
const weaponsSchema = require('./schemas/weapons')
const app = express()

const root = {
  weapons: () => (
    Weapons.list()
  )
}

app.use(cors())

app.use('/graphql', graphqlHTTP({
  rootValue: root,
  schema: weaponsSchema,
  graphiql: true
}))

app.listen(3000)
