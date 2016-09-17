export default (state, action) => {
  if (state === undefined) {
    return {
      number: 13,
      played: undefined,
      ap: 6,
      text: 'A CRUEL WIND BLOWS. 13 CROWS FLY OVERHEAD.'
    }
  }
}
