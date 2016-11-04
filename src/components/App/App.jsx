import React, { PropTypes } from 'react'
import HealthBar from '../HealthBar'
import Ability from '../Ability'
import style from './App.scss'

const App = ({ health, maxHealth, startAbility }) => {
  const abilities = ['rock', 'teleport'].map((name, i) => {
    const onTouchStart = startAbility.bind(null, i)
    return (
      <Ability
        name={name}
        onTouchStart={onTouchStart}
        key={name}
      />
    )
  })

  return (
    <div>
      <HealthBar health={health} maxHealth={maxHealth} />
      <div className="ability-icons">
        {abilities}
      </div>
    </div>
  )
}

App.propTypes = {
  maxHealth: PropTypes.number.isRequired,
  health: PropTypes.number.isRequired,
  startAbility: PropTypes.func.isRequired,
}

export default App
