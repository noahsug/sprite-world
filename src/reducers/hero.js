import reducer from './reducer'
import { useAp, setAp } from '../actions'
import { createLetter } from '../lib/letters'
import ap from './ap'

const getAttackCost = (hero) => (
  hero.played.reduce((s, v) => s + v.ap, 0)
)

const hero = reducer({
  initState: {
    letters: ['A', 'F', 'T', 'D'].map(createLetter),
    played: [],
  },
  actionHandlers: {
    ADD_LETTER: (nextState, action) => {
      nextState.played = nextState.played.slice()
      nextState.played.push(action.letter)
    },

    REMOVE_LETTER: (nextState, action) => {
      nextState.played = nextState.played.slice()
      nextState.played.splice(action.index, 1)
    },

    ATTACK_ENEMY: (nextState, action, state) => {
      const apCost = getAttackCost(state)
      hero.reduceChild(ap, useAp(apCost))
      nextState.played = []
    },

    NEXT_ENEMY: (nextState) => {
      hero.reduceChild(ap, setAp())
    },
  },
  children: { ap },
})

export default hero
