import React, { PropTypes } from 'react'
import cn from 'classnames'
import { _ } from '../../utils'
import FontAwesome from 'react-fontawesome'
import './ActionPoints.scss'

const ActionPoints = ({ current, max, dmg }) => {
  const isUsed = (i) => i >= current

  const circles = _.range(max - dmg).map(i => (
    <FontAwesome
      key={i}
      name="circle"
      className={cn({ 'used': isUsed(i) })}
    />
  ))
  return (
    <div className="action-points">
      {circles}
    </div>
  )
}

ActionPoints.propTypes = {
  current: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  dmg: PropTypes.number.isRequired,
  regen: PropTypes.number.isRequired,
  lastTick: PropTypes.number.isRequired,
}

export default ActionPoints
