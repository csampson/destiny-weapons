/**
 * @overview Table/list of weapons and their stats
 */

import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import startCase from 'lodash/startCase'

import styles from './styles.css'
import query from './query.gql'

const columns = new Map()
  .set('firearms', [
    { cellKey: 'stat_rounds_per_minute', header: 'Rate of Fire' },
    { cellKey: 'stat_magazine', header: 'Magazine' },
    { cellKey: 'stat_impact', header: 'Impact' },
    { cellKey: 'stat_range', header: 'Range' },
    { cellKey: 'stat_zoom', header: 'Zoom' },
    { cellKey: 'stat_recoil_direction', header: 'Recoil' },
    { cellKey: 'stat_stability', header: 'Stability' },
    { cellKey: 'stat_aim_assistance', header: 'Aim Assist' },
    { cellKey: 'stat_handling', header: 'Handling' },
    { cellKey: 'stat_reload_speed', header: 'Reload Speed' }
  ])
  .set('fusion-rifles', [
    { cellKey: 'stat_charge_time', header: 'Charge Time' },
    { cellKey: 'stat_magazine', header: 'Magazine' },
    { cellKey: 'stat_impact', header: 'Impact' },
    { cellKey: 'stat_range', header: 'Range' },
    { cellKey: 'stat_zoom', header: 'Zoom' },
    { cellKey: 'stat_stability', header: 'Stability' },
    { cellKey: 'stat_aim_assistance', header: 'Aim Assist' },
    { cellKey: 'stat_handling', header: 'Handling' },
    { cellKey: 'stat_reload_speed', header: 'Reload Speed' }
  ])
  .set('launchers', [
    { cellKey: 'stat_blast_radius', header: 'Blast Radius' },
    { cellKey: 'stat_velocity', header: 'Velocity' },
    { cellKey: 'stat_rounds_per_minute', header: 'Rate of Fire' },
    { cellKey: 'stat_magazine', header: 'Magazine' },
    { cellKey: 'stat_stability', header: 'Stability' },
    { cellKey: 'stat_aim_assistance', header: 'Aim Assist' },
    { cellKey: 'stat_handling', header: 'Handling' },
    { cellKey: 'stat_reload_speed', header: 'Reload Speed' }
  ])
  .set('swords', [
    { cellKey: 'stat_impact', header: 'Impact' },
    { cellKey: 'stat_defense', header: 'Defense' },
    { cellKey: 'stat_swing_speed', header: 'Swing Speed' },
    { cellKey: 'stat_ammo_capacity', header: 'Ammo' },
    { cellKey: 'stat_efficiency', header: 'Efficiency' }
  ])

function getColumns (category) {
  if (/auto_rifle|submachine_gun|pulse_rifle|scout_rifle|hand_cannon|sidearm|shotgun|sniper_rifle/.test(category)) {
    return columns.get('firearms')
  } else if (/fusion_rifle|linear_fusion_rifle/.test(category)) {
    return columns.get('fusion-rifles')
  } else if (/grenade_launcher|rocket_launcher/.test(category)) {
    return columns.get('launchers')
  } else if (/sword/.test(category)) {
    return columns.get('swords')
  }
}

class Weapons extends React.PureComponent {
  render () {
    /** @todo Loading state */
    if (!this.props.weapons) {
      return null
    }

    const { category } = this.props.filters

    const weapons = this.props.weapons.filter(weapon => (
      weapon.type === category
    ))

    return (
      <section className={styles['weapons']}>
        <table className={styles['weapons-table']}>
          <thead>
            <tr>
              <th className={styles['weapons-table-header']} scope='col'>Weapon</th>
              <th className={styles['weapons-table-header']} scope='col'>Frame</th>

              {getColumns(category).map(column => (
                <th className={styles['weapons-table-header']} scope='col' key={column.cellKey}>{column.header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {weapons.map(weapon => (
              <tr key={weapon.name}>
                {/** @todo Escape `weapon.name`? */}
                <th className={styles['weapons-table-header']} scope='row'>
                  {weapon.name}<br />
                  <span className={styles['weapon-type']}>{startCase(weapon.type)}</span>
                </th>

                <td className={styles['weapons-table-cell']}>{startCase(weapon.perks[0].replace('frame', ''))}</td>

                {getColumns(category).map(column => (
                  <td className={styles['weapons-table-cell']} key={column.cellKey}>{weapon[column.cellKey]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}

Weapons.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string
  }).isRequired,
  weapons: PropTypes.arrayOf(PropTypes.object)
}

export default graphql(query, {
  /** @todo Handle errors */
  props: ({ data }) => ({
    weapons: data.weapons
  })
})(Weapons)
