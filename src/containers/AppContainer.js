import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
  health: state.health,
  maxHealth: state.maxHealth,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
