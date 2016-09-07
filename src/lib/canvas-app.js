import _ from '../utils'
import { paper, view } from 'paper/dist/paper-core'
import { GameLogic, State } from './game-engine'

export default class CanvasApp {
  init(canvas) {
    paper.setup(canvas)

    this.state = new State()
    this.gameLogic = new GameLogic()
  }

  run() {
    this.gameLogic.run(this.state)

    view.onFrame = e => {
      if (!e.delta) return

      // React to other entities.
      const len = this.state.numEntities
      for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
          this.state.entities[i].react(this.state.entities[j])
        }
      }

      // Update entities.
      for (let i = 0; i < len; i++) {
        this.state.entities[i].update(e)
      }

      // Progress game logic.
      this.gameLogic.update(e)
    }
  }
}
