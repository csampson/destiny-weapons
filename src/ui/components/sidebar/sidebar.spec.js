/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'

import Sidebar from './sidebar'

describe('Sidebar', () => {
  let component
  let props
  let setFilter

  beforeEach(() => {
    setFilter = jest.fn()

    props = {
      setFilter,
      filters: {
        category: '<category>'
      }
    }

    component = mount(
      <Sidebar {...props} />
    )
  })

  describe('when an option is selected', () => {
    it('should update the weapon type filter', () => {
      component.find('input[value="auto_rifle"]').simulate('change')
      expect(setFilter).toHaveBeenCalledWith('category', 'auto_rifle')
    })
  })

  describe('when a weapon type is selected', () => {
    it('should have a checked input', () => {
      component.setProps({
        filters: {
          category: 'pulse_rifle'
        }
      })

      expect(component.find('input[value="pulse_rifle"]').is('[checked=true]')).toBe(true)
    })
  })
})
