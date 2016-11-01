import React, { PropTypes } from 'react'
import HealthBar from '../HealthBar'
import style from './App.scss'

const App = ({ health, maxHealth }) => (
  <div>
    <HealthBar health={health} maxHealth={maxHealth} />
  </div>
)

App.propTypes = {
  maxHealth: PropTypes.number.isRequired,
  health: PropTypes.number.isRequired,
}

export default App
