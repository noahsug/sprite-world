import React, { PropTypes } from 'react'
import './Resources.scss'

const Resources = ({ body, spirit, soul }) => (
  <div>
    body: {body}, spirit: {spirit}, soul: {soul}
  </div>
)

Resources.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Resources
