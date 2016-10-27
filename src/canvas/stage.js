import { Container } from 'pixi.js'

export default class Stage {
  constructor() {
    this.container = new Container()
  }

  add(entity) {
    this.container.addChild(entity)
  }

  updateZIndex() {
    this.container.children.sort((a, b) => {
      return a.z - b.z || a.y - b.y
    })
  }
}
