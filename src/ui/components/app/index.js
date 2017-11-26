import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Weapons from '../weapons'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql'
  }),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <main>
      <Weapons />
    </main>
  </ApolloProvider>
)

export default App
