import { inject } from 'aurelia-dependency-injection'

import World from './world'
import Map from './map'

const right = { x: 1, y: 0, direction: 'right' }
const left = { x: -1, y: 0, direction: 'left' }
const down = { x: 0, y: 1, direction: 'down' }
const up = { x: 0, y: -1, direction: 'up' }

// Order of adjecent tiles to check based on current direciton.
const adjacentChecks = {
  right: [right, up, down, left],
  left: [left, up, down, right],
  down: [down, right, left, up],
  up: [up, right, left, down],
}

@inject(World, Map)
export default class PlayerController {
  constructor(world, map) {
    this.map = map
    this.world = world

    this.pressed = {
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
    }
    this.touch = {
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
    window.addEventListener('touchstart', (e) => {
      this.touch.start = touchXY(e);
    })
    window.addEventListener('touchend', (e) => {
      if (!this.touch.start) return
      const end = touchXY(e)
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

  update(player) {
    this.setDirection(player)
    if (this.pressed.ATTACK) {
      const direction = this.getDirectionToAdjacentEnemy(player)
      player.attack(direction)
    }
  }

  getDirectionToAdjacentEnemy(player) {
    const { x, y } = player
    const checks = adjacentChecks[player.direction]
    for (let i = 0; i < 4; i++) {
      const dir = checks[i]
      if (this.map.get(x + dir.x, y + dir.y).entity) return dir.direction
    }
    return ''
  }

  setDirection(player) {
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
    player.setDirection(xdir, ydir)
  }
}

function touchXY(e) {
  return {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  }
}
