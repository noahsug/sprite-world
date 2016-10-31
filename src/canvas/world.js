export default class World {
  constructor() {
    this.player = null
    this.entities = []
  }

  static UNIT = 32

  update() {
    let len = this.entities.length
    for (let i = 0; i < len; i++) {
      this.entities[i].update()
    }
    for (let i = 0; i < len; i++) {
      const entity = this.entities[i]
      if (!entity.dead) continue
      entity.die()
      this.entities[i] = this.entities[len - 1]
      this.entities[len - 1] = entity
      len--
      i--
    }
    this.entities.length = len
  }
}
