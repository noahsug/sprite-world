import _ from '../utils'
import { paper, view } from 'paper/dist/paper-core'
import { GameLogic, State } from './game-engine'

export default class CanvasApp {
  init(canvas) {
    const canvas = window.document.getElementById('fg')
    paper.setup(canvas)

    this.gameLogic_ = new GameLogic()
    this.state_ = new State()
  }

  run() {
    view.onFrame = e => {
      // React to other entities.
      const len = this.state_.entities.length
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          this.state_.entities[i].react(this.state_.entities[j])
        }
      }

      // Update entities.
      for (let i = 0; i < len; i++) {
        this.state_.entities[i].update(e)
      }

      // Progress game logic.
      this.gameLogic_.update(this.state_, e)
    }
  }
}
