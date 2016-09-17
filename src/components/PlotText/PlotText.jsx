import React, { PropTypes } from 'react'
import './PlotText.scss'

const PlotText = ({ text }) => (
  <div className="plot-text">
    {text}
  </div>
)

PlotText.propTypes = {
  text: PropTypes.string.isRequired,
}

export default PlotText
