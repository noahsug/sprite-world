import React, { PropTypes } from 'react'
import './App.scss'
import PlotText from '../PlotText'
import EnemyContainer from '../../containers/EnemyContainer'
import HeroContainer from '../../containers/HeroContainer'

const App = ({ plot }) => (
  <div className="app">
    <PlotText {...plot} />
    <EnemyContainer />
    <HeroContainer />
  </div>
)

App.propTypes = {
  plot: PropTypes.object.isRequired,
}

export default App
