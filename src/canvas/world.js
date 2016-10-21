export default class World {
  constructor() {
    this.player = null
    this.entities = []
  }

  static UNIT = 32

  update() {
    const len = this.entities.length
    for (let i = 0; i < len; i++) {
      this.entities[i].update()
    }
  }
}
