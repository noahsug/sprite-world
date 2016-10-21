import { Container } from 'pixi.js'

export default class Stage {
  constructor() {
    this.container = new Container()
  }

  add(entity) {
    this.container.addChild(entity)
  }
}
