import { loader, Container, Sprite, autoDetectRenderer } from 'pixi.js'

const assetPath = (name) => `/assets/${name}.png`

const init = (root) => {
  const renderer = autoDetectRenderer(800, 600)
  root.appendChild(renderer.view)

  const stage = new Container()

  let goblin
  loader.add('goblin', assetPath('goblin')).load((loader, resources) => {
    // This creates a texture from a 'bunny.png' image.
    goblin = new Sprite(resources.goblin.texture)
    goblin.position.x = 100
    goblin.position.y = 100
    goblin.scale.x = 2
    goblin.scale.x = 2

    stage.addChild(goblin)
    renderer.render(stage)
  })
}

const destroy = () => {

}

export default {
  init,
  destroy,
}