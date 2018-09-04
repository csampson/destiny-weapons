import { connect } from 'react-redux'
import WeaponsTable from './WeaponsTable'

const mapStateToProps = (state) => ({
  filter: state.weapons.filter,
  weapons: state.weapons.current
})

export default connect(mapStateToProps)(WeaponsTable)
