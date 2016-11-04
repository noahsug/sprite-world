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

    this.abilityUsed = null
    this.abilityStarted = null
  }

  update() {
    this.abilityUsed = null
    if (!this.resolveState) return
    this.resolveState(this.world)
  }

  useAbility(ability) {
    this.abilityUsed = ability
  }

  startAbility(ability) {
    this.abilityStarted = ability
  }
}
