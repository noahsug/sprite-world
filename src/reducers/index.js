import reduce from './reduce'
import hero from './hero'
import enemy from './enemy'
import plot from './plot'

export default reduce({}, {
  ATTACK_ENEMY: (nextState, action, state) => {
    const dmg = state.hero.played.reduce((s, v) => s + v.dmg, 0)
    const enemyAp = state.enemy.ap - dmg
    nextState.enemy = { ...state.enemy, ap: enemyAp }
  },
}, { hero, enemy, plot })
