import React, { PropTypes } from 'react'
import './PlotText.scss'

const PlotText = ({ text }) => {
  const split = text.split('. ')
  const lines = split.map((line, i) => {
    const terminator = i === split.length - 1 ? '' : '.'
    return <div key={i}>{line}{terminator}</div>
  })

  return (
    <div className="plot-text">
      {lines}
    </div>
  )
}

PlotText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default PlotText
