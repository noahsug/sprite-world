export default (state, action) => {
  if (state === undefined) {
    return {
      letters: ['A', 'F', 'T', 'D'],
      played: [],
      ap: 6,
    }
  }

  return state
}
