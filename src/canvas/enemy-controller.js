import { inject } from 'aurelia-dependency-injection'

import World from './world'
import Map from './map'

@inject(World, Map)
export default class EnemyController {
  constructor(world, map) {
    this.map = map
    this.world = world
  }

  updateAll() {
    // Skip first entity, which is always the player controlled hero.
    const len = this.world.entities.length
    for (let i = 1; i < len; i++) {
      this.update(this.world.entities[i])
    }
  }

  update(entity) {
    const target = this.world.player
    const ahead = entity.ahead
    if (ahead.x === target.x && ahead.y === target.y) {
      entity.attack()
      return
    }
    const { xdir, ydir } = this.getXYDir(entity, target)
    entity.setDirection(xdir, ydir)
  }

  getXYDir(entity, target) {
    const dx = target.x - entity.x
    const dy = target.y - entity.y
    let xdir = Math.sign(dx)
    let ydir = Math.sign(dy)

    // Diagonally touching target.
    if (Math.abs(dx) === 1 && Math.abs(dy) === 1) {
      if (Math.random() < 0.5) xdir = 0
      else ydir = 0
      return { xdir, ydir }
    }

    // Way is blocked.
    const tx = entity.x + xdir
    const ty = entity.y + ydir
    const obj = this.map.collides(tx, ty)

    // Reached target.
    if (obj === target) return { xdir, ydir }

    // Blocked by obstacle.
    if (obj) {
      if (xdir && ydir) {
        if (Math.random() < 0.5) xdir = 0
        else ydir = 0
      } else if (xdir) {
        ydir = Math.random() < 0.5 ? 1 : -1
      } else if (ydir) {
        xdir = Math.random() < 0.5 ? 1 : -1
      }
      return { xdir, ydir }
    }

    return { xdir, ydir }
  }
}
