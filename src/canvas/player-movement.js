import { inject } from 'aurelia-dependency-injection'

import World from './world'

@inject(World)
export default class PlayerMovement {
  constructor(world) {
    this.world = world
    this.pressed = {
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
    }
    this.mouse = {
      start: null,
      swipe: null,
    }
  }

  listenToInput() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'w') this.pressed.UP = true
      else if (e.key === 'a') this.pressed.LEFT = true
      else if (e.key === 's') this.pressed.DOWN = true
      else if (e.key === 'd') this.pressed.RIGHT = true
      else if (e.key === ' ') this.pressed.ATTACK = true
    })
    window.addEventListener('keyup', (e) => {
      if (e.key === 'w') this.pressed.UP = false
      else if (e.key === 'a') this.pressed.LEFT = false
      else if (e.key === 's') this.pressed.DOWN = false
      else if (e.key === 'd') this.pressed.RIGHT = false
      else if (e.key === ' ') this.pressed.ATTACK = false
    })
    window.addEventListener('mousedown', (e) => {
      this.mouse.start = { x: e.x, y: e.y }
    })
    window.addEventListener('mouseup', (e) => {
      if (!this.mouse.start) return
      const dx = e.x - this.mouse.start.x
      const dy = e.y - this.mouse.start.y
      if (Math.abs(dx) > Math.abs(dy)) {
        this.mouse.swipe = { xdir: Math.sign(dx), ydir: 0 }
      } else {
        this.mouse.swipe = { ydir: Math.sign(dy), xdir: 0 }
      }
      this.mouse.start = { x: e.x, y: e.y }
    })
  }

  update() {
    if (this.pressed.ATTACK) this.world.player.attack()
    let speed = this.world.player.speed
    let xdir = 0
    let ydir = 0
    if (this.pressed.UP) ydir -= 1
    if (this.pressed.LEFT) xdir -= 1
    if (this.pressed.DOWN) ydir += 1
    if (this.pressed.RIGHT) xdir += 1

    if (this.mouse.swipe) {
      xdir = this.mouse.swipe.xdir
      ydir = this.mouse.swipe.ydir
      this.mouse.swipe = null
    }

    this.world.player.setDirection(xdir, ydir)
  }
}
