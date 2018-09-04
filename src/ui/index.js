import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import WeaponsTable from './components/WeaponsTable'
import reducers from './reducers'

const state = {
  weapons: {
    filter: {},
    sortBy: 'name',
    sortOrder: 'ascending',
    current: []
  },
  pinned: [],
  searchResults: []
}

/**
 * `primary_type`: 'firearm`, `fusion_rifle`, `sword`, `launcher`
 * `secondary_type`: 'scout_rifle', 'auto_rifle'
 * `damage_type`: 'kinetic', 'void', 'arc', 'solar'
 * `tier`: 'exotic', 'legandary'
 * `max_zoom`: 'short', 'medium', 'long'
 * `frame`: 'lightweight'
 * `trait`: ['arc_core']
 */

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = () => (
  <Provider store={store}>
    <WeaponsTable />
  </Provider>
)

const harness = document.createElement('main')

ReactDOM.render(<App />, harness)
document.body.appendChild(harness)
