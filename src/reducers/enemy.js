export default (state, action) => {
  if (state === undefined) {
    return {
      number: 13,
      played: [],
      ap: 6,
    }
  }

  return state
}
