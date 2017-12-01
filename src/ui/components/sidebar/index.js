/**
 * @overview App sidebar for weapon type filtering
 */

import React from 'react'

import styles from './styles.css'

const Filter = (props) => (
  <li>
    <label className={styles['filters-label']}>
      <input className={styles['filters-hidden-input']} name='filter' type='radio' value={props.value} />
      {props.label}
    </label>
  </li>
)

class Sidebar extends React.PureComponent {
  constructor (props) {
    super(props)

    this.onWeaponTypeChange = this.onWeaponTypeChange.bind(this)
  }

  onWeaponTypeChange (event) {
    console.debug(event.target)
  }

  render () {
    return (
      <form className={styles['filters']}>
        <section className={styles['filters-section']}>
          <header className={styles['filters-header']}>Weapon Type</header>

          <ul className={styles['filters-list']}>
            <Filter label='Auto Rifle' value='auto_rifle' checked />
            <Filter label='Submachine Gun' value='submachine_gun' />
            <Filter label='Pulse Rifle' value='pulse_rifle' />
            <Filter label='Scout Rifle' value='scout_rifle' />
            <Filter label='Hand Cannon' value='hand_cannon' />
            <Filter label='Sidearm' value='sidearm' />
            <Filter label='Shotgun' value='shotguns' />
            <Filter label='Sniper Rifle' value='sniper_rifle' />
            <Filter label='Linear Fusion Rifle' value='linear_fusion_rifle' />
            <Filter label='Fusion Rifle' value='fusion_rifle' />
            <Filter label='Rocket Launcher' value='rocket_launcher' />
            <Filter label='Sniper Rifle' value='sniper_rifle' />
            <Filter label='Sword' value='sword' />
          </ul>
        </section>
      </form>
    )
  }
}

export default Sidebar
