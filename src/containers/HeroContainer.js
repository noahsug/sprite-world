import { connect } from 'react-redux'
import { addLetter, removeLetter } from '../actions'
import Hero from '../components/Hero'

const mapStateToProps = state => ({
  ...state.hero,
})

const mapDispatchToProps = dispatch => ({
  addLetter: (c) => dispatch(addLetter(c)),
  removeLetter: (c, i) => dispatch(removeLetter(i))
})

export default connect(mapStateToProps, mapDispatchToProps)(Hero)
