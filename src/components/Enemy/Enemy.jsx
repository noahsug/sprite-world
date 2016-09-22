import React, { PropTypes } from 'react'
import ActionPoints from '../ActionPoints'
import './Enemy.scss'

const Enemy = ({ number, played, ap }) => (
  <div className="enemy">
    <div className="number">
      {number}
    </div>
    <ActionPoints value={ap} />
  </div>
)

Enemy.propTypes = {
  number: PropTypes.number.isRequired,
  played: PropTypes.arrayOf(PropTypes.string).isRequired,
  ap: PropTypes.number.isRequired,
}

export default Enemy
