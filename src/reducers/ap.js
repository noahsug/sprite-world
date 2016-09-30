import { _ } from '../utils'
import reducer from './reducer'
import { setAp } from '../actions'

const init = (ap) => ({
  current: ap,
  max: ap,
  lastTick: 0,
  regen: 10,
})

const ap = reducer({
  initState: {
    ...init(6),
  },
  actionHandlers: {
    NEXT_LEVEL: (nextState) => {
      Object.assign(nextState, init(nextState.max))
    },

    TICK: (nextState, action) => {
      if (nextState.current >= nextState.max) {
        nextState.lastTick = action.tick
        return
      }
      const dt = action.tick - nextState.lastTick
      if (dt >= nextState.regen) {
        nextState.lastTick = action.tick
        nextState.current += 1
      }
    },

    USE_AP: (nextState, action) => {
      nextState.current -= action.ap
    },
  },
})

export default ap
