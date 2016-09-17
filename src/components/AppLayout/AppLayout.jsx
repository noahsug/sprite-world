import React, { PropTypes } from 'react'
import './AppLayout.scss'
import PlotText from '../PlotText'

const AppLayout = ({ plotText }) => (
  <div className="app">
    <PlotText text={plotText} />
  </div>
)

//    <Enemy />
//    <Hero />

AppLayout.propTypes = {
  plotText: PropTypes.string.isRequired,
}

export default AppLayout
