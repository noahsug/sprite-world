import { inject } from 'aurelia-dependency-injection'
import { SCALE_MODES } from 'pixi.js'

import Dispatcher from './dispatcher'
import { UNIT } from './world'

@inject(Dispatcher)
export default class Entity {
  static UNIT = 52

  constructor(dispatcher) {
    this.dispatch = dispatcher.getDispatch()
    this.x = 0
    this.y = 0
    this.rx = 0
    this.ry = 0
    this.xdir = 0
    this.ydir = 0
    this.next = { xdir: 0, ydir: 0 }
    this.speed = 0
    this.sprite = null
    this.state = ''
    this.direction = 'down'
  }

  setSprite(sprite) {
    this.sprite = sprite
    this.sprite.anchor.x = 0.5
    this.animate('idle')
  }

  setPos(x, y) {
    this.x = x
    this.y = y
    this.rx = this.x * UNIT
    this.ry = this.y * UNIT
    this.updateSpritePos()
  }

  setDirection(xdir, ydir) {
    this.next.xdir = xdir
    this.next.ydir = ydir

    // If we're moving, we can only reverse direction or continue on.
    const currentDir = 3 * this.xdir + this.ydir
    if (currentDir && Math.abs(currentDir) != Math.abs(3 * xdir + ydir)) return

    this.xdir = xdir
    this.ydir = ydir
    this.updateAnimation()
  }

  attack() {
    if (this.xdir || this.ydir) return
    this.animate('attack')
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
      area: [{ x: this.x + 1, y: this.y }]
    })
  }

  updatePosition(distance = this.speed) {
    if (this.xdir || this.ydir) {
      if (this.xdir && this.ydir) distance *= Math.SQRT1_2
      const remaining = this.move(this.xdir * distance, this.ydir * distance)
      if (remaining) {
        this.updatePosition(remaining)
        return
      }
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
    this.rx += dx
    this.ry += dy
    let remaining = 0
    const xdest = (this.x + this.xdir) * UNIT
    const ydest = (this.y + this.ydir) * UNIT
    const xdif = xdest - this.rx
    const ydif = ydest - this.ry
    if (this.xdir !== Math.sign(xdif)) this.rx = xdest
    if (this.ydir !== Math.sign(ydif)) this.ry = ydest
    if (this.rx === xdest && this.ry === ydest) {
      this.x += this.xdir
      this.y += this.ydir
      this.xdir = this.next.xdir
      this.ydir = this.next.ydir
      remaining = Math.sqrt(xdif * xdif + ydif * ydif)
    }
    this.updateSpritePos()
    return remaining
  }

  updateSpritePos() {
    this.sprite.x = this.sprite.offset.x + this.rx
    this.sprite.y = this.sprite.offset.y + this.ry
  }

  animate(state) {
    const direction = this.getDirection()
    if (state === this.state && direction == this.direction) return
    this.state = state
    this.direction = direction

    this.sprite.loop = state !== 'attack'
    this.sprite.fps = this.animationFps
    this.sprite.scale.x = this.direction === 'left' ? -1 : 1
    const frames = this.sprite.animations[this.direction][state]
    this.sprite.playAnimation(frames)
  }

  getDirection() {
    if (this.xdir > 0) return 'right'
    if (this.xdir < 0) return 'left'
    if (this.ydir > 0) return 'down'
    if (this.ydir < 0) return 'up'
    return this.direction
  }

  get animationFps() {
    if (this.state === 'attack') {
      return 8
    }
    if (this.state === 'walk') {
       return this.speed * 0.555
    }
    return 2
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
}
