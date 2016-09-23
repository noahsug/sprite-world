import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = state => ({
  plotText: state.plot.text,
})

export default connect(mapStateToProps)(App)
