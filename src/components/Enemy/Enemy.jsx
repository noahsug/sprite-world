import React, { PropTypes } from 'react'
import ActionPoints from '../ActionPoints'
import './Enemy.scss'

const Enemy = ({ attacks, attackIndex, playWord }) => (
  <div className="enemy" onClick={playWord}>
    {attackIndex}
  </div>
)

Enemy.propTypes = {
  attacks: PropTypes.array.isRequired,
  attackIndex: PropTypes.number.isRequired,
  playWord: PropTypes.func.isRequired,
}

export default Enemy
