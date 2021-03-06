import { inject } from 'aurelia-dependency-injection'

import Renderer from './renderer'
import Assets from './assets'
import Dispatcher from './dispatcher'
import Runner from './runner'
import Map from './map'
import EntityFactory from './entity-factory'
import Stage from './stage'
import World from './world'
import PlayerController from './player-controller'
import Collisions from './collisions'
import EnemyController from './enemy-controller'
import Game from './game'
import Ui from './ui'
import Abilities from './abilities'
import Spawner from './spawner'

@inject(Renderer, Assets, Dispatcher, Runner, Map, EntityFactory, Stage, World,
        PlayerController, Collisions, EnemyController, Game, Ui, Abilities,
        Spawner)
    export default class Reducer {
  constructor(renderer, assets, dispatcher, runner, map, entityFactory, stage,
              world, playerController, collisions, enemyController, game, ui,
              abilities, spawner) {
    this.spawner = spawner
    this.abilities = abilities
    this.ui = ui
    this.game = game
    this.enemyController = enemyController
    this.collisions = collisions
    this.playerController = playerController
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
        this.world.player.canJuke = true

        this.playerController.listenToInput()
        this.runner.start()
        break
      }

      case 'ENTITY_CREATED': {
        this.stage.add(data.sprite)
        this.world.entities.push(data)
        break
      }

      case 'UPDATE': {
        // Entities must not travel > UNIT distance in a single update.
        this.spawner.update()
        this.enemyController.updateAll()
        this.playerController.update(this.world.player)
        this.abilities.update()
        this.collisions.update()
        this.world.update()
        this.map.update()
        this.collisions.update()
        this.map.update()
        this.stage.updateZIndex()
        this.game.update()
        this.ui.update()
        break
      }

      case 'ATTACK': {
        const len = data.area.length
        for (let i = 0; i < len; i++) {
          const area = data.area[i]
          const target = this.map.get(area.x, area.y).entity
          if (target && target !== data.source) target.takeDmg(data.source.dmg)
        }
        break
      }
    }
  }
}
