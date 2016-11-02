import { inject } from 'aurelia-dependency-injection'

import { _ } from '../utils'
import World from './world'

@inject(World)
export default class Abilities {
  constructor(world, game) {
    this.game = game
    this.world = world
  }

  update() {
    const len = this.world.entities.length
    for (let i = 0; i < len; i++) {
      const entity = this.world.entities[i]
      const abilityLen = entity.abilities.length
      for (let ai = 0; ai < abilityLen; ai++) {
        const ability = entity.abilities[ai]
        if (ability.use) ability.useAbility(entity)
        ability.use = false
      }
    }
  }
}
