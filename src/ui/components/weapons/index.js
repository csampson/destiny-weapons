import { connect } from 'react-redux'
import { graphql } from 'react-apollo'

import Weapons from './weapons'
import query from './query.gql'

const mapStateToProps = (filters) => (
  filters
)

const weaponsWithData = graphql(query, {
  /** @todo Handle errors */
  props: ({ data }) => ({
    weapons: data.weapons
  })
})(Weapons)

export default connect(mapStateToProps)(weaponsWithData)
