import { inject } from 'aurelia-dependency-injection'

import Game from './game'

const WALK_DURATION = 8

@inject(Game)
export default class Input {
  constructor(game) {
    this.game = game

    this.pressed = {
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
      ATTACK: false,
    }
    this.touch = {
      start: null,
      swipe: null,
    }
    this.inputEnd = 0

    this.xdir = 0
    this.ydir = 0
    this.attack = false
  }

  listen() {
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
    window.addEventListener('touchstart', (e) => {
      this.touch.start = this.getTouchXY(e);
    })
    window.addEventListener('touchend', (e) => {
      if (!this.touch.start) return
      const end = this.getTouchXY(e)
      this.touch.swipe = this.getSwipe(this.touch.start, end)
      this.touch.start = null
    })
  }

  getSwipe(start, end) {
    const dx = end.x - start.x
    const dy = end.y - start.y
    const slope = Math.abs(dy / dx)
    let xdir = Math.sign(dx)
    let ydir = Math.sign(dy)
    if (slope < 0.4142) ydir = 0  // < 22.5 deg
    if (slope > 2.4142) xdir = 0  // > 67.5 deg
    return { xdir, ydir }
  }

  getTouchXY(e) {
    return {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    }
  }

  update() {
    const { xdir, ydir } = this.getXYDir()
    const attack = this.pressed.ATTACK
    if (xdir || ydir || attack) {
      this.xdir = xdir
      this.ydir = ydir
      this.attack = attack
      let duration = this.touch.swipe ? WALK_DURATION : 0
      this.inputEnd = this.game.tick + duration
      return
    }

    if (this.inputEnd < this.game.tick) {
      this.xdir = this.ydir = this.attack = 0
    }
  }

  getXYDir() {
    let xdir = 0
    let ydir = 0
    if (this.touch.swipe) {
      xdir = this.touch.swipe.xdir
      ydir = this.touch.swipe.ydir
      this.touch.swipe = null
    } else {
      if (this.pressed.UP) ydir -= 1
      if (this.pressed.LEFT) xdir -= 1
      if (this.pressed.DOWN) ydir += 1
      if (this.pressed.RIGHT) xdir += 1
    }
    return { xdir, ydir }
  }
}
