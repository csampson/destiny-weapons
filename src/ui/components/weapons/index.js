import { connect } from 'react-redux'
import Weapons from './weapons'

const mapStateToProps = (filters) => (
  filters
)

export default connect(mapStateToProps)(Weapons)
