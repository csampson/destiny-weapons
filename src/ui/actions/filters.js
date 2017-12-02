/**
 * @overview Search results filtering
 */

export const SET_FILTER = 'SET_FILTER'

export const setFilter = (name, value) => ({
  type: SET_FILTER,
  payload: {
    name,
    value
  }
})
