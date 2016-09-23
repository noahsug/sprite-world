import { connect } from 'react-redux'
import { attackEnemy } from '../actions'
import Enemy from '../components/Enemy'

const mapStateToProps = state => ({
  ...state.enemy,
})

const mapDispatchToProps = dispatch => ({
  attackEnemy: () => dispatch(attackEnemy())
})

export default connect(mapStateToProps, mapDispatchToProps)(Enemy)
