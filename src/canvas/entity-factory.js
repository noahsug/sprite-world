import { inject, Factory } from 'aurelia-dependency-injection'
import su from '../lib/sprite-utilities'

import { _ } from '../utils'
import Assets from './assets'
import Dispatcher from './dispatcher'
import Entity from './entity'
import { UNIT } from './world'
import sprites from './sprites'

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
    entity.hp = 10
    entity.dmg = 4

    const animations = sprites[name]
    const frames = this.getAnimationFrames(animations, name)
    const sprite = su.sprite(frames)
    sprite.offset = animations.offset
    sprite.animations = this.getAnimationSequences(animations)
    sprite.z = 0
    entity.setSprite(sprite)

    this.dispatch('ENTITY_CREATED', entity)
    return entity
  }

  getAnimationFrames(animations, name) {
    let framePos = []
    this.forEachAnimation(animations, ({ frames }) => {
      for (let x = 0; x < frames.length; x++) {
        const rx = x * animations.width
        const ry = frames.row * animations.height
        framePos.push([rx, ry])
      }
    })
    const frames = su.frames(this.assets.path(name),
                             framePos, animations.width, animations.height)
    return frames
  }

  getAnimationSequences(animations) {
    const sequences = {}
    let count = 0
    this.forEachAnimation(animations, ({ direction, name, frames }) => {
      let seq = sequences[direction]
      if (!seq) seq = sequences[direction] = {}
      seq[name] = [count, count + frames.length - 1]
      seq[name].fps = 1000 / animations.speed[name]
      count += frames.length
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
