/**
 * @overview Search filter state
 */

import {
  SET_FILTER
} from '../actions'

const initialState = {
  category: 'auto_rifle'
}

export default function filters (state = initialState, action) {
  switch (action.type) {
    case SET_FILTER:
      const filter = action.payload

      return {
        ...state,
        [filter.name]: filter.value
      }
    default:
      return initialState
  }
}
