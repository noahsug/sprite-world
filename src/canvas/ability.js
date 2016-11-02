import { inject } from 'aurelia-dependency-injection'

import Game from './game'
import Map from './map'

const abilities = {
  'teleport': {
    cooldown: 0,
  },
  'rock': {
    cooldown: 0,
  },
}

@inject(Game, Map)
export default class Ability {
  constructor(game, map, name) {
    this.map = map
    this.game = game

    _.assert(abilities[name], 'invalid ability', name)
    this.name = name
    this.use = false
    this.start = -Infinity

    this.cooldown = abilities[name].cooldown * this.game.fps
    this.act = this[name]
  }

  useAbility(source) {
    if (this.game.tick - this.start < this.cooldown) return
    const used = this.act(source)
    if (used) this.start = this.game.tick
  }

  // Abilities

  teleport(source) {
    let distance = 4
    return [0, 1, -1, -2].some(offset => {
      const tx = source.x + (distance + offset) * source.direction.x
      const ty = source.y + (distance + offset) * source.direction.y
      if (this.map.collides(tx, ty)) return false
      source.setPos(tx, ty)
      return true
    })
  }

  rock(source) {
    const x = source.targetX
    const y = source.targetY
    if (this.map.entityCollides(source, x, y)) return false
    this.map.placeRock(x, y)
    return true
  }
}
