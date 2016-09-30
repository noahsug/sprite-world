import { connect } from 'react-redux'
import { addLetter } from '../actions'
import App from '../components/App'

const mapStateToProps = state => ({
  letters: state.letters,
  played: state.played,
  ap: state.ap,
})

const mapDispatchToProps = dispatch => ({
  addLetter: (index) => dispatch(addLetter(index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
