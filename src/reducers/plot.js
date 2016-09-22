export default (state, action) => {
  if (state === undefined) {
    return {
      text: 'A cruel wind blows. 13 crows fly overhead.',
    }
  }

  return state
}
