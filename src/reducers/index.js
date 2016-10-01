import reducer from './reducer'
import { createLetter } from '../lib/letters'
import { enemies } from '../lib/enemies'
import { useAp } from '../actions'
import resource from './resource'
import ap from './ap'
import { _ } from '../utils'

const getHeroEffect = (state) => (
  state.played.reduce((s, v) => {
    return s + state.letters[v].effect.body
  }, 0)
)

const getWordCost = (state) => (
  state.played.reduce((s, v) => {
    return s + state.letters[v].ap
  }, 0)
)

const reduceResources = (nextState) => {
  nextState.resources = _.mapObject(nextState.resources, (v, k) => {

  })
}

const app = reducer({
  initState: {
    letters: ['A', 'F', 'T', 'D'].map(createLetter),
    played: [],
    resources: {
      body: resource(),
      spirit: resource(),
      soul: resource()
    },
    attacks: [],
    attackIndex: 0,
    attackRate: 1,  // Attacks / second
    level: -1,
  },
  actionHandlers: {
    NEXT_LEVEL: (nextState, action) => {
      nextState.level += 1
      const enemyDesc = enemies[nextState.level]
      nextState.attacks = enemyDesc.attacks
      nextState.attackIndex = 0
      nextState.played = []
      nextState.resources = {
        body: resource(nextState.resources.body, action),
        spirit: resource(),
        soul: resource()
      }
    },

    ADD_LETTER: (nextState, action) => {
      nextState.played = nextState.played.slice()
      nextState.played.push(action.index)
    },

    REMOVE_LETTER: (nextState, action) => {
      nextState.played = nextState.played.slice()
      nextState.played.splice(action.index, 1)
    },

    PLAY_WORD: (nextState, action, state) => {
      console.log('effect:', getHeroEffect(state))
      const apCost = getWordCost(state)
      app.reduceChild(ap, useAp(apCost))
      nextState.played = []
    },
  },
  children: { ap },
})

export default app
