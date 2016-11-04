import { connect } from 'react-redux'
import { startAbility } from '../actions'
import App from '../components/App'

const mapStateToProps = state => ({
  health: state.health,
  maxHealth: state.maxHealth,
})

const mapDispatchToProps = dispatch => ({
  startAbility: (ability) => dispatch(startAbility(ability))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
