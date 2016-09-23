import React, { PropTypes } from 'react'
import { _ } from '../../utils'
import FontAwesome from 'react-fontawesome'
import './ActionPoints.scss'

const ActionPoints = ({ value }) => {
  const circles = _.range(value).map(i => (
    <FontAwesome key={i} name="circle" />
  ))
  return (
    <div className="action-points">
      {circles}
    </div>
  )
}

ActionPoints.propTypes = {
  value: PropTypes.number.isRequired,
}

export default ActionPoints
