import { combineReducers } from 'redux'
import hero from './hero'
import enemy from './enemy'
import plot from './plot'

export default combineReducers({
  hero, enemy, plot,
})
