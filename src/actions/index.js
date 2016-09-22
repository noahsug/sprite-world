const addLetter = (letter) => ({
  type: 'ADD_LETTER',
  letter,
})

const removeLetter = (index) => ({
  type: 'REMOVE_LETTER',
  index,
})

export default {
  addLetter,
  removeLetter,
}
