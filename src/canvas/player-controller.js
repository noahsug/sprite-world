import { inject } from 'aurelia-dependency-injection'

import { Direction as Dir } from './utils'
import World from './world'
import Map from './map'
import Input from './input'

// Order of adjecent tiles to check based on current direciton.
const adjacentChecks = {
  right: [Dir.right, Dir.up, Dir.down, Dir.left],
  left: [Dir.left, Dir.up, Dir.down, Dir.right],
  down: [Dir.down, Dir.right, Dir.left, Dir.up],
  up: [Dir.up, Dir.right, Dir.left, Dir.down],
}

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
    if (this.input.attack) {
      const direction = this.getDirectionToAdjacentEnemy(player)
      player.attack(direction)
    }
  }

  getDirectionToAdjacentEnemy(player) {
    const { x, y } = player
    const checks = adjacentChecks[player.direction.name]
    for (let i = 0; i < 4; i++) {
      const dir = checks[i]
      if (this.map.get(x + dir.x, y + dir.y).entity) return dir
    }
    return null
  }
}
