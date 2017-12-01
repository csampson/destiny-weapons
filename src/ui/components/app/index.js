import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Sidebar from '../sidebar'
import Weapons from '../weapons'
import styles from './styles.css'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:3000/graphql'
  }),
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <main className={styles.app}>
      <Sidebar />
      <Weapons />
    </main>
  </ApolloProvider>
)

export default App
