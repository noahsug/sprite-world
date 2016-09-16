jest.unmock('../player')
jest.unmock('../ability')
jest.unmock('../item')
jest.unmock('../stats-decorator')

import Player from '../player'
import Ability from '../ability'
import Item from '../item'

class TestData {
  createAbility({name, ap}) {
    const ability = new Ability()
    ability.name = name
    ability.ap = ap
    return ability
  }

  createItem({name, ability}) {
    const item = new Item()
    item.name = name
    item.ability = ability
    return item
  }

  createPlayer({name, speed = 5, items}) {
    const player = new Player()
    player.name = name
    player.items = items
    player.ap = 5
    player.health = 5
    player.speed = speed
    return player
  }

  createWackAbility() {
    const wack = this.createAbility({name: 'wack', ap: 2})
    wack.use = (s, t) => t.health -= 2
    return wack
  }

  createScratchAbility() {
    const scratch = this.createAbility({name: 'scratch', ap: 3})
    scratch.use = (s, t) => t.health -= 4
    return scratch
  }

  createBatItem() {
    const wack = this.createWackAbility()
    return this.createItem({name: 'bat', ability: wack})
  }

  createClawItem() {
    const scratch = this.createScratchAbility()
    return this.createItem({name: 'claw', ability: scratch})
  }

  createHero() {
    const items = [this.createClawItem(), this.createBatItem()]
    return this.createPlayer({name: 'hero', items})
  }

  createEnemy() {
    const items = [this.createClawItem(), this.createBatItem()]
    return this.createPlayer({name: 'enemy', items})
  }
}

export default new TestData()
