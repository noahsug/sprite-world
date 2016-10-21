import { inject } from 'aurelia-dependency-injection'

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
    this.speed = 0
    this.sprite = null
    this.state = ''
  }

  setSprite(sprite) {
    this.sprite = sprite
    this.animate('idle')
  }

  setPos(x, y) {
    this.x = x
    this.y = y
    this.rx = this.x * UNIT
    this.ry = this.x + this.xdir * UNIT
    this.updateSpritePos()
  }

  setDirection(xdir, ydir) {
        xdir
ydir -1  0  1
  -1  E  B  C
   0  D  A  D
   1  C  B  E

     -1  0  1
     -1  0  1
     -1  0  1

     -1 -1 -1
      0  0  0
      1  1  1

      1  0 -1
      0  0  0  y * x
     -1  0  1

     -2 -1  0
     -1  0  1
      0  1  2





    if ((this.xdir && !xdir) || (this.ydir && !ydir)) return
    if (this.xdir && !this.ydir && ydir) return
    if (this.ydir && !this.xdir && xdir) return
    if (this.xdir && this.ydir && this.xdir !=
    this.xdir = xdir
    this.ydir = ydir
  }

  attack() {
    if (this.xdir || this.ydir) return
    this.animate('attack')
  }

  update() {
    if (this.state === 'attack') this.updateAttack()
    if (this.state !== 'attack') this.updatePosition()
  }

  updateAttack() {
    if (this.sprite.animating) return
    this.state = ''
    this.dispatch('ATTACK', {
      source: this,
      area: [{ x: this.x + 1, y: this.y }]
    })
  }

  updatePosition() {
    if (this.xdir || this.ydir) {
      let speed = this.speed
      if (this.xdir && this.ydir) speed *= Math.SQRT1_2
      this.move(this.xdir * speed, this.ydir * speed)
      this.animate('walk')
    } else {
      this.animate('idle')
    }
  }

  move(dx, dy) {
    this.rx += dx
    this.ry += dy
    const xdest = (this.x + this.xdir) * UNIT
    const ydest = (this.x + this.xdir) * UNIT
    if (this.xdir === Math.sign(xdest - this.rx)) this.rx = xdest
    if (this.ydir === Math.sign(ydest - this.ry)) this.ry = ydest
    if (this.rx === xdest && this.ry === ydest) {
      this.x += this.xdir
      this.y += this.ydir
      this.xdir = this.ydir = 0
    }
    this.updateSpritePos()
  }

  updateSpritePos() {
    this.sprite.x = this.sprite.offset.x + this.rx
    this.sprite.y = this.sprite.offset.y + this.ry
  }

  animate(state) {
    if (state === this.state) return
    this.sprite.loop = state !== 'attack'
    this.state = state

    const frames = this.sprite.animations[state]
    this.sprite.fps = this.animationFps
    this.sprite.playAnimation([frames.start, frames.end])
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
}
