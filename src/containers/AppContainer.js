import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
  plot: state.plot,
})

export default connect(mapStateToProps)(App)
