import { autoDetectRenderer } from 'pixi.js'

export default class Renderer {
  init(root) {
    this.root = root;
    this.renderer = autoDetectRenderer(root.offsetWidth, root.offsetHeight)
    root.appendChild(this.renderer.view)
  }

  render(stage) {
    this.renderer.render(stage);
  }
}
