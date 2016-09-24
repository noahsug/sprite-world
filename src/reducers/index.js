import reducer from './reducer'
import { enemies } from '../lib/enemies'
import { takeDmg, setEnemy } from '../actions'
import hero from './hero'
import enemy from './enemy'
import plot from './plot'

const getHeroDmg = (hero) => (
  hero.played.reduce((s, v) => s + v.dmg, 0)
)

const app = reducer({
  actionHandlers: {
    ATTACK_ENEMY: (nextState, action, state) => {
      const dmg = getHeroDmg(state.hero)
      app.reduceChild(enemy, takeDmg(dmg))
    },

    NEXT_ENEMY: (nextState) => {
      const enemyDesc = enemies[nextState.plot.level]
      app.reduceChild(enemy, setEnemy(enemyDesc))
    },
  },
  children: { hero, enemy, plot },
})

export default app
