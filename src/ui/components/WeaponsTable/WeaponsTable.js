import React, { Component } from 'react'
import PropTypes from 'prop-types'

import columns from './columns'

class WeaponsTable extends Component {
  render () {
    const type = this.props.filter.type

    return (
      <table>
        <thead>
          <tr>
            <th scope='col'>Name</th>

            {columns.get(type).map(column => (
              <th scope='col' key={column.cellKey}>{column.header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {this.props.weapons.map(weapon => (
            <tr key={weapon.name}>
              <th scope='row'>{weapon.name}</th>

              {columns.get(type).map(column => (
                <td key={column.cellKey}>{weapon[column.cellKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

/** @todo Define weapons schema? */
WeaponsTable.propTypes = {
  filter: PropTypes.object.isRequired,
  weapons: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired
}

export default WeaponsTable
