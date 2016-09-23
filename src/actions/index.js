import createActions from './create-actions'

export default createActions({
  nextEnemy: [],
  addLetter: ['letter'],
  removeLetter: ['index'],

  // Called when the player attacks the enemy.
  attackEnemy: [],

  // Called by reducers after attackEnemy, or attackPlayer is called.
  useAp: ['ap'],

  // Called by reducers after attackEnemy, or attackPlayer is called.
  takeDmg: ['dmg'],

  // Called every 100ms.
  tick: ['tick'],
})
