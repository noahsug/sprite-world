import { inject } from 'aurelia-dependency-injection'

import World, { UNIT } from './world'
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

    if (this.map.get(entity.x, entity.y).fg) {
      const dx = entity.x * UNIT - entity.rx
      const dy = entity.y * UNIT - entity.ry
      if (Math.sign(dx) === entity.xdir) entity.xdir = 0
      if (Math.sign(dy) === entity.ydir) entity.ydir = 0
    }

    const xCollides = this.map.entityCollides(entity, entity.destX, entity.y)
    const yCollides = this.map.entityCollides(entity, entity.x, entity.destY)
    if (xCollides || yCollides) {
      if (xCollides && yCollides) entity.collide()
      else if (xCollides) entity.collideX()
      else if (yCollides) entity.collideY()
    } else if (this.map.entityCollides(
        entity, entity.destX, entity.destY)) {
      entity.collideY()
    }
  }
}
