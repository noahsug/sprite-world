import reducer from './reducer'

const reduceAppState = reducer({
  init: {
    maxHealth: 0,
    health: 0,
  },
  SET_HEALTH: (nextState, { health }) => {
    if (health > nextState.maxHealth) nextState.maxHealth = health
    nextState.health = health
    if (nextState.health < 0) nextState.health = 0
  },
})

export default reduceAppState
