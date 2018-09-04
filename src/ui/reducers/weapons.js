import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'
import allWeapons from '../../api/data/weapons.json'

const DEFAULT_FILTER = {
  type: 'firearm'
}

const initialState = {
  current: sortBy(
    filter(allWeapons, DEFAULT_FILTER),
    'name'
  ),
  filter: DEFAULT_FILTER,
  sortBy: 'name',
  sortOrder: 'descending'
}

const weapons = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default weapons
