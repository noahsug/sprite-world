import React, { PropTypes } from 'react'
import './App.scss'
import EnemyContainer from '../../containers/EnemyContainer'
import Word from '../Word'
import Letters from '../Letters'
import ActionPoints from '../ActionPoints'

const App = ({ played, letters, addLetter, ap }) => (
  <div className="app">
    <EnemyContainer />
    <Word {...{played, letters}} />
    <Letters {...{played, letters}} onClick={addLetter} />
    <ActionPoints {...ap} />
  </div>
)

App.propTypes = {
  letters: PropTypes.array.isRequired,
  played: PropTypes.array.isRequired,
  ap: PropTypes.object.isRequired,
  addLetter: PropTypes.func.isRequired,
}

export default App
