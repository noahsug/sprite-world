const AP_REGEN = 10

import reducer from './reducer'

export default reducer({
  init: {
    current: 6,
    max: 6,
    dmg: 0,
    regen: 10,
    lastTick: 0,
  },
  actions: {
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
  },
})
