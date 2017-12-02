/* eslint-env jest */

import { SET_FILTER, setFilter } from './filters'

describe('Filter', () => {
  describe('setFilter', () => {
    it('should create an action to update a filter param', () => {
      expect(setFilter('<name>', '<value>')).toEqual({
        type: SET_FILTER,
        payload: {
          name: '<name>',
          value: '<value>'
        }
      })
    })
  })
})
