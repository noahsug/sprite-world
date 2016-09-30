import React, { PropTypes } from 'react'
import cn from 'classnames'
import { _ } from '../../utils'
import './Letters.scss'

const Letters = ({ letters, played, onClick }) => {
  const components = letters.map((c, i) => (
    <span key={i} onClick={_.partial(onClick, i)}>{c.letter}</span>
  ))

  return (
    <div className="letters">
      {components}
    </div>
  )
}

Letters.propTypes = {
  letters: PropTypes.array.isRequired,
  played: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Letters
