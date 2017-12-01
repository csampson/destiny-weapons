/**
 * @overview Root Redux reducer
 */

import { combineReducers } from 'redux'
import filters from './filters'

const root = combineReducers({
  filters
})

export default root
