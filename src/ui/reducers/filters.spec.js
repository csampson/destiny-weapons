/* eslint-env jest */

import reducer from './filters'
import { SET_FILTER } from '../actions'

describe('Filters', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      category: 'auto_rifle'
    })
  })

  describe('SET_FILTER', () => {
    it('should update the given filter param', () => {
      expect(reducer(undefined, {
        type: SET_FILTER,
        payload: { name: '<name>', value: '<value>' }
      })).toEqual({
        category: 'auto_rifle',
        '<name>': '<value>'
      })
    })
  })
})
