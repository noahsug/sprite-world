import React, { PropTypes } from 'react'
import './App.scss'
import PlotText from '../PlotText'
import EnemyContainer from '../../containers/EnemyContainer'
import HeroContainer from '../../containers/HeroContainer'

const App = ({ plotText }) => (
  <div className="app">
    <PlotText text={plotText} />
    <EnemyContainer />
    <HeroContainer />
  </div>
)

App.propTypes = {
  plotText: PropTypes.string.isRequired,
}

export default App
