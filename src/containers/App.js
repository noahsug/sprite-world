import { connect } from 'react-redux'
import AppLayout from '../components/AppLayout'

const mapStateToProps = (state) => ({
  plotText: state.enemy.text,
})

export default connect(mapStateToProps)(AppLayout)
