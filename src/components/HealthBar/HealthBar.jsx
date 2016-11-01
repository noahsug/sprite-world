import React, { PropTypes } from 'react'
import './HealthBar.scss'

const HealthBar = ({ health, maxHealth }) => {
  if (!maxHealth) return null
  const style = {
    width: `${health / maxHealth}%`,
  }

  return (
    <div className="health-bar">
      <span style={style}></span>
    </div>
  )
}

HealthBar.propTypes = {
  health: PropTypes.number.isRequired,
}

export default HealthBar
