/**
 * @overview Table/list of weapons and their stats
 */

import React from 'react'
import PropTypes from 'prop-types'
import startCase from 'lodash/startCase'

import styles from './styles.css'

const primaryStats = new Map()
  .set('firearms', [
    { label: (weapon) => (`Impact (${weapon.damage_type})`), value: (weapon) => weapon.stat_impact },
    { label: (weapon) => ('Magazine Size'), value: (weapon) => weapon.stat_magazine },
    { label: (weapon) => ('Rounds Per Minute'), value: (weapon) => weapon.stat_rounds_per_minute }
  ])
  .set('fusion-rifles', [
    { label: (weapon) => (`Impact (${weapon.damage_type})`), value: (weapon) => weapon.stat_impact },
    { label: (weapon) => ('Magazine Size'), value: (weapon) => weapon.stat_magazine },
    { label: (weapon) => ('Charge Time'), value: (weapon) => weapon.stat_charge_time }
  ])
  .set('launchers', [
    { label: (weapon) => (`Blast Radius (${weapon.damage_type})`), value: (weapon) => weapon.stat_blast_radius },
    { label: (weapon) => ('Magazine Size'), value: (weapon) => weapon.stat_magazine },
    { label: (weapon) => ('Rounds Per Minute'), value: (weapon) => weapon.stat_rounds_per_minute }
  ])
  .set('swords', [
    { label: (weapon) => (`Impact (${weapon.damage_type})`), value: (weapon) => weapon.stat_impact },
    { label: (weapon) => ('Ammo'), value: (weapon) => weapon.stat_ammo_capacity },
    { label: (weapon) => ('Swing Speed'), value: (weapon) => weapon.stat_swing_speed }
  ])

const secondaryStats = new Map()
  .set('firearms', [
    { key: 'stat_range', label: 'Range' },
    { key: 'stat_recoil_direction', label: 'Recoil' },
    { key: 'stat_stability', label: 'Stability' },
    { key: 'stat_aim_assistance', label: 'Aim Assist' },
    { key: 'stat_handling', label: 'Handling' },
    { key: 'stat_reload_speed', label: 'Reload' }
  ])
  .set('fusion-rifles', [
    { key: 'stat_range', label: 'Range' },
    { key: 'stat_recoil_direction', label: 'Recoil' },
    { key: 'stat_stability', label: 'Stability' },
    { key: 'stat_aim_assistance', label: 'Aim Assist' },
    { key: 'stat_handling', label: 'Handling' },
    { key: 'stat_reload_speed', label: 'Reload' }
  ])
  .set('launchers', [
    { key: 'stat_velocity', label: 'Velocity' },
    { key: 'stat_stability', label: 'Stability' },
    { key: 'stat_aim_assistance', label: 'Aim Assist' },
    { key: 'stat_handling', label: 'Handling' },
    { key: 'stat_reload_speed', label: 'Reload' }
  ])
  .set('swords', [
    { key: 'stat_range', label: 'Range' },
    { key: 'stat_defense', label: 'Defense' },
    { key: 'stat_efficiency', label: 'Efficiency' }
  ])

const Bar = ({ attr, value }) => {
  let rating

  if (value >= 70) {
    rating = 'excellent'
  } else if (value >= 45) {
    rating = 'average'
  } else {
    rating = 'poor'
  }

  return (
    <span
      className={styles['weapon-bar-fill']}
      data-attr={attr}
      data-rating={rating}
      style={{ width: attr === 'stat_rounds_per_minute' ? `${value / 10}%` : `${value}%` }}
    />
  )
}

function getWeaponType (category) {
  if (/auto_rifle|submachine_gun|pulse_rifle|scout_rifle|hand_cannon|sidearm|shotgun|sniper_rifle/.test(category)) {
    return 'firearms'
  } else if (/fusion_rifle|linear_fusion_rifle/.test(category)) {
    return 'fusion-rifles'
  } else if (/grenade_launcher|rocket_launcher/.test(category)) {
    return 'launchers'
  } else if (/sword/.test(category)) {
    return 'swords'
  }
}

class Weapons extends React.PureComponent {
  render () {
    /** @todo Loading state */
    if (!this.props.weapons) {
      return null
    }

    const { category } = this.props.filters
    const weaponType = getWeaponType(category)

    /** @todo Handle this via reducer */
    const weapons = this.props.weapons.filter(weapon => (
      weapon.type === category
    ))

    return (
      <section className={styles['weapons']}>
        <ul className={styles['weapons-list']}>
          {weapons.map(weapon => (
            <li className={styles['weapon-item']} key={weapon.name}>
              <div className={styles['weapon-header']}>
                <img className={styles['weapon-image']} src={weapon.icon} alt='' />

                <p>
                  <span className={styles['weapon-name']} data-tier={weapon.tier}>
                    {weapon.name}
                  </span>

                  <span className={styles['weapon-type']}>
                    {startCase(weapon.type)}
                  </span>
                </p>
              </div>

              <table className={styles['weapon-secondary-stats']}>
                <tbody className={styles['weapon-secondary-stats-body']}>
                  {secondaryStats.get(weaponType).map((column, index) => (
                    <tr className={styles['weapon-secondary-stats-row']} key={column.label}>
                      <th className={styles['weapon-secondary-stats-label']} scope='row'>{column.label}</th>
                      <td className={styles['weapon-bar']}>
                        <Bar attr={column.key} value={weapon[column.key]} />
                        <span className={styles['weapon-bar-value']}>{weapon[column.key]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className={styles['weapon-primary-stats']}>
                <tbody className={styles['weapon-primary-stats-body']}>
                  {primaryStats.get(weaponType).map(stat => (
                    <tr className={styles['weapon-primary-stats-row']} key={stat.label}>
                      <th className={styles['weapon-primary-stats-header']} scope='row'>
                        {stat.label(weapon)}
                      </th>

                      <td className={styles['weapon-primary-stats-cell']}>
                        {stat.value(weapon)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
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

export default Weapons
