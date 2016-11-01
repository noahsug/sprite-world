import { inject } from 'aurelia-dependency-injection'
import { SCALE_MODES } from 'pixi.js'

import { Direction as Dir } from './utils'
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
    this.sprite = null
    this.state = ''
    this.direction = Dir.down
    this.tile = null
    this.attackStart = -Infinity
    this.attackCooldown = 0.8 * this.game.fps
    this.health = 0
    this.dmg = 0
    this.speed = 0
    this.intelligence = Math.round(0.2 * this.game.fps)
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

  moveInDirection(xdir, ydir) {
    if (this.state === 'attack') return
    this.xdir = xdir
    this.ydir = ydir
    this.updateAnimation()
  }

  attack(direction) {
    if (this.state !== 'idle') return false
    if (this.game.tick - this.attackStart < this.attackCooldown) return false
    if (direction) this.direction = direction
    this.animate('attack')
    this.attackStart = this.game.tick
    this.dispatch('ATTACK', {
      source: this,
      area: [this.ahead]
    })
    return true
  }

  update() {
    if (this.state === 'attack' && this.sprite.animating) return
    this.updatePosition()
    this.animate(this.xdir || this.ydir ? 'walk' : 'idle')
  }

  updatePosition() {
    let distance = this.speed / this.game.fps
    if (this.xdir || this.ydir) {
      if (this.xdir && this.ydir) distance *= Math.SQRT1_2
      this.move(this.xdir * distance, this.ydir * distance)
    }
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
    this.updateSpritePos()
  }

  updateSpritePos() {
    this.sprite.x = this.sprite.offset.x + this.rx
    this.sprite.y = this.sprite.offset.y + this.ry
  }

  animate(state) {
    const direction = Dir.get(this.xdir, this.ydir) || this.direction
    if (state === this.state && direction === this.direction) return
    this.state = state
    this.direction = direction

    const frames = this.sprite.animations[this.direction.name][state]
    this.sprite.loop = state !== 'attack'
    this.sprite.fps = this.getAnimationFps(frames)
    this.sprite.scale.x = this.direction.left ? -1 : 1
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

  takeDmg(dmg) {
    this.health -= dmg
  }

  die() {
    this.sprite.parent.removeChild(this.sprite)
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

  get ahead() {
    return { x: this.x + this.direction.x, y: this.y + this.direction.y }
  }

  get dead() {
    return this.health <= 0
  }
}
