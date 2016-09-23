import React, { PropTypes } from 'react'
import ActionPoints from '../ActionPoints'
import './Enemy.scss'

const Enemy = ({ number, played, ap, attackEnemy }) => (
  <div className="enemy">
    <div className="number" onClick={attackEnemy}>
      {number}
    </div>
    <ActionPoints value={ap} />
  </div>
)

Enemy.propTypes = {
  number: PropTypes.number.isRequired,
  played: PropTypes.arrayOf(PropTypes.number).isRequired,
  ap: PropTypes.number.isRequired,
  attackEnemy: PropTypes.func.isRequired,
}

export default Enemy
