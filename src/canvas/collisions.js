import { inject } from 'aurelia-dependency-injection'

import World from './world'
import Map from './map'

@inject(World, Map)
export default class Collisions {
  constructor(world, map) {
    this.map = map
    this.world = world
  }

  update() {
    const len = this.world.entities.length
    for (let i = 0; i < len; i++) {
      this.collide(this.world.entities[i])
    }
  }

  collide(entity) {
    if (!entity.xdir && !entity.ydir) return
    const xCollides = this.map.entityCollides(entity, entity.targetX, entity.y)
    const yCollides = this.map.entityCollides(entity, entity.x, entity.targetY)
    if (xCollides || yCollides) {
      if (xCollides && yCollides) entity.collide()
      else if (xCollides) entity.collideX()
      else if (yCollides) entity.collideY()
    } else if (this.map.entityCollides(
        entity, entity.targetX, entity.targetY)) {
      entity.collideY()
    }
  }
}
