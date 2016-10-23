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
      this.collideWithMap(this.world.entities[i])
    }
  }

  collideWithMap(entity) {
    const xCollides = this.map.collides(entity.x + entity.xdir, entity.y)
    const yCollides = this.map.collides(entity.x, entity.y + entity.ydir)
    if (xCollides && yCollides) {
      entity.collide()
      return
    }
    if (xCollides) {
      entity.collideX()
      return
    }
    if (yCollides) {
      entity.collideY()
      return
    }
    const collides = this.map.collides(entity.x + entity.xdir,
                                       entity.y + entity.ydir)
    if (collides) {
      entity.collide()
    }
  }
}
