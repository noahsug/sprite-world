import React, { PropTypes } from 'react'
import cn from 'classnames'
import { _ } from '../../utils'
import './Letters.scss'

const Letters = ({ letters, className, onClick, disabled }) => {
  if (disabled) onClick = () => {}

  const components = letters.map((c, i) => (
    <span key={i} onClick={_.partial(onClick, c, i)}>{c.letter}</span>
  ))

  return (
    <div className={cn('letters', className, { disabled })}>
      {components}
    </div>
  )
}

Letters.propTypes = {
  letters: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
}

export default Letters
