/**
 * @overview App sidebar (Redux HOC)
 */

import { connect } from 'react-redux'

import Sidebar from './sidebar'
import { setFilter } from '../../actions'

const mapStateToProps = (filters) => (
  filters
)

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
