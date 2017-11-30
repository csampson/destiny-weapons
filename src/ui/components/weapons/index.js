import React from 'react'
import { graphql } from 'react-apollo'
import startCase from 'lodash/startCase'

import styles from './styles.css'
import query from './query.gql'

const Row = ({ weapon }) => (
  <tr>
    <th className={styles['weapons-table-header']} scope='row'>
      {weapon.name}<br />
      <span className={styles['weapon-type']}>{startCase(weapon.type)}</span>
    </th>

    <td className={styles['weapons-table-cell']}>{startCase(weapon.perks[0].replace('frame', ''))}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_rounds_per_minute}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_impact}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_range}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_zoom}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_recoil_direction}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_stability}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_aim_assistance}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_handling}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_reload_speed}</td>
    <td className={styles['weapons-table-cell']}>{weapon.stat_magazine}</td>
  </tr>
)

class Weapon extends React.PureComponent {
  render () {
    const { weapons } = this.props

    /** @todo Loading state */
    if (!weapons) {
      return null
    }

    return (
      <section className={styles['weapons']}>
        <table className={styles['weapons-table']}>
          <thead>
            <tr>
              <th className={styles['weapons-table-header']} scope='col'>Weapon</th>
              <th className={styles['weapons-table-header']} scope='col'>Frame</th>
              <th className={styles['weapons-table-header']} scope='col'>Rate of Fire</th>
              <th className={styles['weapons-table-header']} scope='col'>Impact</th>
              <th className={styles['weapons-table-header']} scope='col'>Range</th>
              <th className={styles['weapons-table-header']} scope='col'>Zoom</th>
              <th className={styles['weapons-table-header']} scope='col'>Recoil</th>
              <th className={styles['weapons-table-header']} scope='col'>Stability</th>
              <th className={styles['weapons-table-header']} scope='col'>Aim Assist</th>
              <th className={styles['weapons-table-header']} scope='col'>Handling</th>
              <th className={styles['weapons-table-header']} scope='col'>Reload Speed</th>
              <th className={styles['weapons-table-header']} scope='col'>Magazine</th>
            </tr>
          </thead>

          <tbody>
            {weapons.map(weapon => (
              /** @todo Escape `weapon.name`? */
              <Row key={weapon.name} weapon={weapon} />
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

export default graphql(query, {
  /** @todo Handle errors */
  props: ({ data }) => ({
    weapons: data.weapons
  })
})(Weapon)
