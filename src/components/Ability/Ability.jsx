import React, { PropTypes } from 'react'
import cn from 'classnames'
import './Ability.scss'

const Ability = ({ name, onClick, onTouchStart }) => (
  <span
    className={cn('ability', `ability-${name}`)}
    onTouchStart={onTouchStart}
  >
  </span>
)

Ability.propTypes = {
  name: PropTypes.string.isRequired,
  onTouchStart: PropTypes.func.isRequired,
}

export default Ability
