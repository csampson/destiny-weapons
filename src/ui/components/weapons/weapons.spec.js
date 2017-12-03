/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'

import Weapons from './weapons'

describe('Weapons', () => {
  let component
  let props

  beforeEach(() => {
    props = {
      filters: {
        category: 'auto_rifle'
      },
      weapons: []
    }

    component = mount(
      <Weapons {...props} />
    )
  })

  /** @todo Flesh out spec */
  it('should render', () => {
    expect(component).toBeTruthy()
  })
})
