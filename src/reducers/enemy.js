export default (state, action) => {
  if (state === undefined) {
    return {
      number: 13,
      played: undefined,
      ap: 6,
      text: 'A cruel wind blows. 13 crows fly overhead.',
    }
  }

  return state
}
