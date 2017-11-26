import React from 'react'
import { graphql } from 'react-apollo'

import query from './query.gql'

const Row = ({ weapon }) => (
  <tr>
    <th scope='row'>
      {weapon.name}
    </th>

    <td>[frame]</td>
    <td>{weapon.stat_rounds_per_minute}</td>
    <td>{weapon.stat_impact}</td>
    <td>{weapon.stat_range}</td>
    <td>{weapon.stat_zoom}</td>
    <td>{weapon.stat_recoil_direction}</td>
    <td>{weapon.stat_stability}</td>
    <td>{weapon.stat_aim_assistance}</td>
    <td>{weapon.stat_handling}</td>
    <td>{weapon.stat_reload_speed}</td>
    <td>{weapon.stat_magazine}</td>
  </tr>
)

class Weapon extends React.Component {
  render () {
    const { weapons } = this.props

    /** @todo Loading state */
    if (!weapons) {
      return null
    }

    return (
      <table>
        <thead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Frame</th>
            <th scope='col'>Rate of Fire</th>
            <th scope='col'>Impact</th>
            <th scope='col'>Range</th>
            <th scope='col'>Zoom</th>
            <th scope='col'>Recoil</th>
            <th scope='col'>Stability</th>
            <th scope='col'>Aim Assistance</th>
            <th scope='col'>Handling</th>
            <th scope='col'>Reload Speed</th>
            <th scope='col'>Magazine</th>
          </tr>
        </thead>

        <tbody>
          {weapons.map(weapon => (
            /** @todo Escape `weapon.name`? */
            <Row key={weapon.name} weapon={weapon} />
          ))}
        </tbody>
      </table>
    )
  }
}

export default graphql(query, {
  /** @todo Handle errors */
  props: ({ data }) => ({
    weapons: data.weapons
  })
})(Weapon)
