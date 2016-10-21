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
    this.world.player.setDirection(xdir, ydir)
  }
}
