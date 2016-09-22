import { connect } from 'react-redux'
import Enemy from '../components/Enemy'

const mapStateToProps = state => ({
  ...state.enemy,
})

const mapDispatchToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Enemy)
