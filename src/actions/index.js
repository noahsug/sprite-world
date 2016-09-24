import createActions from './create-actions'

export default createActions({
  nextEnemy: [],

  // Called by reducers after nextEnemy.
  setEnemy: ['enemy'],

  // ap is optional, will reset to max AP by default.
  setAp: ['ap'],

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
