import reduce from './reduce'
import { createLetter } from '../lib/letters'

export default reduce({
  letters: ['A', 'F', 'T', 'D'].map(createLetter),
  played: [],
  ap: 6,
}, {
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
})
