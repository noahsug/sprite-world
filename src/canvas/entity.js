import { inject } from 'aurelia-dependency-injection'
import { SCALE_MODES } from 'pixi.js'

import { valueToDirection, directionToValue } from './utils'
import { UNIT } from './world'
import Dispatcher from './dispatcher'
import Game from './game'

@inject(Dispatcher, Game)
export default class Entity {
  static UNIT = 52

  constructor(dispatcher, game) {
    this.game = game
    this.dispatch = dispatcher.getDispatch()
    this.rx = 0
    this.ry = 0
    this.xdir = 0
    this.ydir = 0
    this.next = { xdir: 0, ydir: 0 }
    this.speed = 0
    this.sprite = null
    this.state = ''
    this.direction = 'down'
    this.tile = null
    this.attackCooldown = 8
    this.attackStart = -Infinity
  }

  setSprite(sprite) {
    this.sprite = sprite
    this.sprite.anchor.x = 0.5
    this.animate('idle')
  }

  setPos(x, y) {
    this.rx = x * UNIT
    this.ry = y * UNIT
    this.updateSpritePos()
  }

  setDirection(xdir, ydir) {
    this.next.xdir = xdir
    this.next.ydir = ydir
    if (this.state === 'attack') return

    // If we're moving, we can only reverse direction or continue on.
    const currentDir = 3 * this.xdir + this.ydir
    if (currentDir && Math.abs(currentDir) != Math.abs(3 * xdir + ydir)) return

    this.xdir = xdir
    this.ydir = ydir
    this.updateAnimation()
  }

  attack(direction) {
    if (this.game.tick - this.attackStart < this.attackCooldown) return
    if (this.state !== 'idle') return
    if (direction) this.direction = direction
    this.animate('attack')
    this.attackStart = this.game.tick
  }

  update() {
    if (this.state === 'attack') this.updateAttack()
    if (this.state !== 'attack') {
      this.updatePosition()
      this.updateAnimation()
    }
  }

  updateAttack() {
    if (this.sprite.animating) return
    this.state = ''
    this.dispatch('ATTACK', {
      source: this,
      area: [this.ahead]
    })
  }

  updatePosition(distance = this.speed) {
    if (this.xdir || this.ydir) {
      if (this.xdir && this.ydir) distance *= Math.SQRT1_2
      this.move(this.xdir * distance, this.ydir * distance)
    }
    this.updateAnimation()
  }

  updateAnimation() {
    if (this.xdir || this.ydir) {
      this.animate('walk')
    } else {
      this.animate('idle')
    }
  }

  move(dx, dy) {
    const tx = this.targetX * UNIT
    const ty = this.targetY * UNIT
    const remainingX = Math.abs(dx) - Math.abs(tx - this.rx)
    const remainingY = Math.abs(dy) - Math.abs(ty - this.ry)
    if (remainingX >= 0 && remainingY >= 0) {
      this.rx = tx
      this.ry = ty
      this.xdir = this.next.xdir
      this.ydir = this.next.ydir
      const remaining = Math.sqrt(
          remainingX * remainingX + remainingY * remainingY)
      const diag = (this.xdir && this.ydir) ? Math.SQRT1_2 : 1
      dx = remaining * this.xdir * diag
      dy = remaining * this.ydir * diag
    }
    this.rx += dx
    this.ry += dy
    this.updateSpritePos()
  }

  updateSpritePos() {
    this.sprite.x = this.sprite.offset.x + this.rx
    this.sprite.y = this.sprite.offset.y + this.ry
  }

  animate(state) {
    const direction = valueToDirection(this.xdir, this.ydir) || this.direction
    if (state === this.state && direction == this.direction) return
    this.state = state
    this.direction = direction

    const frames = this.sprite.animations[this.direction][state]
    this.sprite.loop = state !== 'attack'
    this.sprite.fps = this.getAnimationFps(frames)
    this.sprite.scale.x = this.direction === 'left' ? -1 : 1
    this.sprite.playAnimation(frames)
  }

  getAnimationFps(frames) {
    if (this.state === 'walk') {
      return frames.fps * this.speed
    }
    return frames.fps
  }

  collide() {
    this.setPos(this.x, this.y)
    this.xdir = this.ydir = 0
  }

  collideX() {
    this.rx = this.x * UNIT
    this.updateSpritePos()
    this.xdir = 0
  }

  collideY() {
    this.ry = this.y * UNIT
    this.updateSpritePos()
    this.ydir = 0
  }

  get x() {
    return Math.round(this.rx / UNIT)
  }

  get y() {
    return Math.round(this.ry / UNIT)
  }

  get targetX() {
    return Math.round(this.rx / UNIT + 0.501 * this.xdir)
  }

  get targetY() {
    return Math.round(this.ry / UNIT + 0.501 * this.ydir)
  }

  get directionValue() {
    return directionToValue(this.direction)
  }

  get ahead() {
    const { xdir, ydir } = this.directionValue
    return { x: this.x + xdir, y: this.y + ydir }
  }
}
