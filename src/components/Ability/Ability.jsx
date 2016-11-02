import React, { PropTypes } from 'react'
import cn from 'classnames'
import './Ability.scss'

const Ability = ({ name, onClick }) => (
  <span className={cn('ability', `ability-${name}`)} onClick={onClick}>
  </span>
)

Ability.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Ability
