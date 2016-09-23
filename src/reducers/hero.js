import reducer from './reducer'
import { useAp } from '../actions'
import { createLetter } from '../lib/letters'
import ap from './ap'

const getAttackCost = (hero) => (
  hero.played.reduce((s, v) => s + v.ap, 0)
)

const hero = reducer({
  init: {
    letters: ['A', 'F', 'T', 'D'].map(createLetter),
    played: [],
  },
  actions: {
    ADD_LETTER: (nextState, action) => {
      const played = nextState.played.slice()
      played.push(action.letter)
      nextState.played = played
    },

    REMOVE_LETTER: (nextState, action) => {
      const played = nextState.played.slice()
      played.splice(action.index, 1)
      nextState.played = played
    },

    ATTACK_ENEMY: (nextState, action, state) => {
      const apCost = getAttackCost(state)
      nextState.ap = ap(nextState.ap, useAp(apCost))
      nextState.played = []
    },
  },
  children: { ap },
})

export default hero
