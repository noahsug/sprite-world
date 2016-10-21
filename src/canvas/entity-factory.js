import { inject, Factory } from 'aurelia-dependency-injection'
import su from '../lib/sprite-utilities'

import Assets from './assets'
import Dispatcher from './dispatcher'
import Entity from './entity'

@inject(Assets, Dispatcher, Factory.of(Entity))
export default class EntityFactory {
  constructor(assets, dispatcher, createEntity) {
    this.createEntity = createEntity
    this.assets = assets
    this.dispatch = dispatcher.getDispatch()
  }

  create(name) {
    const entity = this.createEntity()
    entity.speed = 10

    const framePos = [
      [0, 0], [52, 0], [52 * 2, 0],  // attack
      [0, 52], [52, 52], [52 * 2, 52],  // walk
      [0, 52 * 2], [52, 52 * 2],  // idle
    ]
    const frames = su.frames(this.assets.path(name), framePos, 52, 52)
    const sprite = su.sprite(frames)
    sprite.offset = { x: -10, y: -18 }
    sprite.animations = {
      attack: { start: 0, end: 2 },
      walk: { start: 3, end: 5 },
      idle: { start: 6, end: 7 },
    }
    entity.setSprite(sprite)

    this.dispatch('ENTITY_CREATED', entity)
    return entity
  }
}
