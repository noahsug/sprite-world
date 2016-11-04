import { inject } from 'aurelia-dependency-injection'

import { Direction as Dir } from './utils'
import World from './world'
import Map from './map'
import Input from './input'

@inject(World, Map, Input)
export default class PlayerController {
  constructor(world, map, input) {
    this.input = input
    this.map = map
    this.world = world
  }

  listenToInput() {
    this.input.listen()
  }

  update(player) {
    if (player.dead) return
    this.input.update()
    player.moveInDirection(this.input.xdir, this.input.ydir)
    if (this.input.ability !== null) {
      player.abilities[this.input.ability].use = true
    }
    if (player.state === 'idle') this.maybeAttackEnemies(player)
    this.input.endUpdate()
  }

  maybeAttackEnemies(player) {
    const target = this.map.get(player.targetX, player.targetY).entity
    if (!target) return
    player.attack()
  }
}
