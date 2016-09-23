import { _ } from '../../utils'

const LETTERS = {
  'A': {},
  'D': {},
  'F': {},
  'T': {},
}

_.each(LETTERS, (obj, letter) => {
  obj.ap = 1
  obj.dmg = 1
  obj.letter = letter
})

const createLetter = (char) => {
  return LETTERS[char]
}

export default {
  createLetter,
}
