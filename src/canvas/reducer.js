import { inject } from 'aurelia-dependency-injection'

import Renderer from './renderer'
import Assets from './assets'
import Dispatcher from './dispatcher'
import Runner from './runner'
import Map from './map'
import EntityFactory from './entity-factory'
import Stage from './stage'
import World from './world'
import PlayerMovement from './player-movement'
import Collisions from './collisions'

@inject(Renderer, Assets, Dispatcher, Runner, Map, EntityFactory, Stage, World, PlayerMovement, Collisions)
export default class Reducer {
  constructor(renderer, assets, dispatcher, runner, map, entityFactory, stage, world, playerMovement, collisions) {
    this.collisions = collisions
    this.playerMovement = playerMovement
    this.world = world
    this.stage = stage
    this.entityFactory = entityFactory
    this.map = map
    this.runner = runner
    this.assets = assets
    this.renderer = renderer
    this.dispatch = dispatcher.getDispatch()
  }

  reduce(type, data) {
    switch (type) {
      case 'ATTACH': {
        this.renderer.attach(data)
        this.assets.preload().then(() => { this.dispatch('PRELOADED') })
        break
      }

      case 'PRELOADED': {
        this.map.generate()
        this.world.player = this.entityFactory.create('goblin')
        this.world.player.setPos(0, 0)
        this.runner.start()
        this.playerMovement.listenToInput()
        break
      }

      case 'ENTITY_CREATED': {
        this.stage.add(data.sprite)
        this.world.entities.push(data)
        break
      }

      case 'UPDATE': {
        this.playerMovement.update()
        this.collisions.update()
        this.world.update()
        break
      }
    }
  }
}
