import { inject } from 'aurelia-dependency-injection'
import World from './world'

@inject(World)
export default class Ui {
  constructor(world) {
    this.world = world

    this.getState = () => (
      new Promise((resolve) => {
        this.resolveState = resolve
      })
    )
  }

  update() {
    if (!this.resolveState) return
    this.resolveState(this.world)
  }
}
