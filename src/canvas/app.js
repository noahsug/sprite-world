import { inject } from 'aurelia-dependency-injection'
import { loader, Container, Sprite } from 'pixi.js'
import Renderer from './renderer'

const assetPath = (name) => `/assets/${name}.png`

@inject(Renderer)
export default class App {
  constructor(renderer) {
    this.renderer = renderer
  }

  attach(root) {
    this.renderer.init(root)
    const stage = new Container()

    let goblin
    loader.add('goblin', assetPath('goblin')).load((loader, resources) => {
      // This creates a texture from a 'bunny.png' image.
      goblin = new Sprite(resources.goblin.texture)
      goblin.position.x = 0
      goblin.position.y = 0
      goblin.scale.x = 2
      goblin.scale.y = 2

      stage.addChild(goblin)
      this.renderer.render(stage)
    })
  }
}
