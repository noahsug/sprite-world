import { _ } from '../utils'
import reducer from './reducer'
import { setAp } from '../actions'

const init = (ap) => ({
  current: ap,
  max: ap,
  dmg: 0,
  lastTick: 0,
})

const ap = reducer({
  initState: {
    ...init(6),
    regen: 10,
  },
  actionHandlers: {
    TICK: (nextState, action) => {
      if (nextState.current >= nextState.max - nextState.dmg) {
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
      if (nextState.current < 0) nextState.current = 0
    },

    TAKE_DMG: (nextState, action) => {
      nextState.dmg += action.dmg
    },

    SET_ENEMY: (nextState, action) => {
      ap.reduce(setAp(action.enemy.ap))
    },

    SET_AP: (nextState, action) => {
      const ap = _.ifDef(action.ap, nextState.max)
      Object.assign(nextState, init(ap))
    }
  },
})

export default ap
