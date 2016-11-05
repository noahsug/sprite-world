import { inject } from 'aurelia-dependency-injection'

import { _ } from '../utils'
import EntityFactory from './entity-factory'
import Game from './game'
import Renderer from './renderer'
import { UNIT } from './world'

@inject(EntityFactory, Game, Renderer)
export default class Spawner {
  constructor(entityFactory, game, renderer) {
    this.renderer = renderer
    this.game = game
    this.entityFactory = entityFactory

    this.spawnRate = 2 * this.game.fps
    this.lastSpawned = -Infinity
  }

  update() {
    if (this.game.tick - this.lastSpawned < this.spawnRate) return
    this.lastSpawned = this.game.tick
    if (this.spawnRate > this.game.fps) this.spawnRate--

    const enemy = this.entityFactory.create('snake')
    const width = this.renderer.width / UNIT
    const height = this.renderer.height / UNIT
    enemy.setPos(_.random(width - 1), _.random(height - 1))
  }
}
