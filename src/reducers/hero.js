import reduce from './reduce'

export default reduce({
  letters: ['A', 'F', 'T', 'D'],
  played: ['F', 'A', 'T'],
  ap: 6,
}, {
  ADD_LETTER: (state, action) => {
    const letters = state.letters.slice()
    const played = state.played.slice()
    played.push(action.letter)
    return { played, letters }
  },

  REMOVE_LETTER: (state, action) => {
    const letters = state.letters.slice()
    const played = state.played.slice()
    played.splice(action.index, 1)
    return { played, letters }
  }
})
