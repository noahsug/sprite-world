import createActions from './create-actions'

export default createActions({
  nextLevel: [],

  addLetter: ['index'],

  removeLetter: ['index'],

  playWord: [],

  // Called by reducers after playWord.
  useAp: ['ap'],

  // Called every 100ms.
  tick: ['tick'],
})
