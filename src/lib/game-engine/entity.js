export default class Entity {
  constructor() {
    this.id = 0
    this.type = ''
    this.x = 0
    this.y = 0
    this.boxWidth = 0
    this.boxHeight = 0
    this.active = true
    this.behavior = {}
  }
}
