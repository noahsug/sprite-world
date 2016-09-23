export function addLetter(letter) {
  return {
    type: 'ADD_LETTER',
    letter,
  }
}

export function removeLetter(index) {
  return {
    type: 'REMOVE_LETTER',
    index,
  }
}

export function attackEnemy() {
  return {
    type: 'ATTACK_ENEMY',
  }
}
