export default class Game {
  constructor() {
    this.tick = 0
    this.fps = 12
  }

  update() {
    this.tick++
  }
}
