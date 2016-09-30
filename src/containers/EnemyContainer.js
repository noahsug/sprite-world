import { connect } from 'react-redux'
import { playWord } from '../actions'
import Enemy from '../components/Enemy'

const mapStateToProps = state => ({
  attacks: state.attacks,
  attackIndex: state.attackIndex,
})

const mapDispatchToProps = dispatch => ({
  playWord: () => dispatch(playWord()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Enemy)
