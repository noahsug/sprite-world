import reducer from './reducer'
import { takeDmg } from '../actions'
import hero from './hero'
import enemy from './enemy'
import plot from './plot'

const getHeroDmg = (hero) => (
  hero.played.reduce((s, v) => s + v.dmg, 0)
)

export default reducer({
  actions: {
    ATTACK_ENEMY: (nextState, action, state) => {
      const dmg = getHeroDmg(state.hero)
      nextState.enemy = enemy(nextState.enemy, takeDmg(dmg))
    },
  },
  children: { hero, enemy, plot },
})
