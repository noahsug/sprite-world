import { inject, Factory } from 'aurelia-dependency-injection'
import su from '../lib/sprite-utilities'

import { _ } from '../utils'
import Assets from './assets'
import Dispatcher from './dispatcher'
import Entity from './entity'
import { UNIT } from './world'

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

    const animations = {
      id: 'goblin',
      width: 52,
      height: 52,
      offset: { x: -10 + 52 / 2, y: -18},
      right: {
        attack: { row: 0, length: 3 },
        walk: { row: 1, length: 3 },
        idle: { row: 2, length: 2 },
      },
      up: {
        attack: { row: 3, length: 3 },
        walk: { row: 4, length: 4 },
        idle: { row: 5, length: 2 },
      },
      down: {
        attack: { row: 6, length: 3 },
        walk: { row: 7, length: 4 },
        idle: { row: 8, length: 2 },
      },
    }
    const frames = this.getAnimationFrames(animations)
    const sprite = su.sprite(frames)
    sprite.offset = animations.offset
    sprite.animations = this.getAnimationSequences(animations)
    entity.setSprite(sprite)

    this.dispatch('ENTITY_CREATED', entity)
    return entity
  }

  getAnimationFrames(animations) {
    let framePos = []
    this.forEachAnimation(animations, (animation) => {
      for (let x = 0; x < animation.frames.length; x++) {
        const rx = x * animations.width
        const ry = animation.frames.row * animations.height
        framePos.push([rx, ry])
      }
    })
    const frames = su.frames(this.assets.path(animations.id),
                             framePos, animations.width, animations.height)
    return frames
  }

  getAnimationSequences(animations) {
    const sequences = {}
    let count = 0
    this.forEachAnimation(animations, (animation) => {
      let seq = sequences[animation.direction]
      if (!seq) seq = sequences[animation.direction] = {}
      seq[animation.name] = [count, count + animation.frames.length - 1]
      count += animation.frames.length
    })
    sequences.left = sequences.right
    return sequences
  }

  forEachAnimation(animationData, callback) {
    const directions = ['right', 'up', 'down']
    directions.forEach(direction => {
      const directionData = animationData[direction]
      if (!directionData) return
      const animations = Object.keys(directionData).sort()
      animations.forEach(name => {
        const frames = directionData[name]
        callback({ direction, name, frames })
      })
    })
  }
}
