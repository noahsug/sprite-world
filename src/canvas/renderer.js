import { autoDetectRenderer } from 'pixi.js'

export default class Renderer {
  attach(root) {
    this.width = root.offsetWidth
    this.height = root.offsetHeight

    this.renderer = autoDetectRenderer(root.offsetWidth, root.offsetHeight)
    root.appendChild(this.renderer.view)
  }

  render(container, texture) {
    this.renderer.render(container, texture)
  }
}
