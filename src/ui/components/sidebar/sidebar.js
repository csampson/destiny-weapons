/**
 * @overview App sidebar for weapon type filtering
 */

import React from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

const SidebarItem = ({ children, filters, onChange, value }) => (
  <li>
    <label className={styles['filters-label']}>
      <input
        className={styles['filters-hidden-input']}
        name='filter'
        type='radio'
        value={value}
        checked={filters.category === value}
        onChange={onChange}
      />

      <span className={styles['filters-label-text']}>{children}</span>
    </label>
  </li>
)

class Sidebar extends React.PureComponent {
  constructor (props) {
    super(props)

    this.onWeaponTypeChange = this.onWeaponTypeChange.bind(this)
  }

  onWeaponTypeChange (event) {
    this.props.setFilter('category', event.target.value)
  }

  render () {
    return (
      <form className={styles['filters']}>
        <section className={styles['filters-section']}>
          <header className={styles['filters-header']}>Category</header>

          <ul className={styles['filters-list']}>
            <SidebarItem value='auto_rifle' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Auto Rifles
            </SidebarItem>

            <SidebarItem value='submachine_gun' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Submachine Guns
            </SidebarItem>

            <SidebarItem value='pulse_rifle' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Pulse Rifles
            </SidebarItem>

            <SidebarItem value='scout_rifle' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Scout Rifles
            </SidebarItem>

            <SidebarItem value='hand_cannon' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Hand Cannons
            </SidebarItem>

            <SidebarItem value='sidearm' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Sidearms
            </SidebarItem>

            <SidebarItem value='shotgun' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Shotguns
            </SidebarItem>

            <SidebarItem value='sniper_rifle' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Sniper Rifles
            </SidebarItem>

            <SidebarItem value='linear_fusion_rifle' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Linear Fusion Rifles
            </SidebarItem>

            <SidebarItem value='fusion_rifle' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Fusion Rifles
            </SidebarItem>

            <SidebarItem value='rocket_launcher' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Rocket Launchers
            </SidebarItem>

            <SidebarItem value='grenade_launcher' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Grenade Launchers
            </SidebarItem>

            <SidebarItem value='sword' onChange={this.onWeaponTypeChange} filters={this.props.filters}>
              Swords
            </SidebarItem>
          </ul>
        </section>
      </form>
    )
  }
}

Sidebar.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    category: PropTypes.string.isRequired
  })
}

export default Sidebar
