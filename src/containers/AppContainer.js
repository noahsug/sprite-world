import { connect } from 'react-redux'
import { useAbility } from '../actions'
import App from '../components/App'

const mapStateToProps = state => ({
  health: state.health,
  maxHealth: state.maxHealth,
})

const mapDispatchToProps = dispatch => ({
  useAbility: (ability) => dispatch(useAbility(ability))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
