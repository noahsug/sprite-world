import Blob from './blob'
import { Architect } from 'synaptic'

export default class GameLogic {
  run(state) {
    this.state = state

    const blob = new Blob()
    state.add(blob)
  }

  update(state, dt) {
  }
}
