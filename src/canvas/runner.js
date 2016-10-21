import { inject } from 'aurelia-dependency-injection'
import { createRunner } from '../lib/smoothie'

import Stage from './stage'
import Dispatcher from './dispatcher'
import Renderer from './renderer'

@inject(Stage, Dispatcher, Renderer)
export default class Runner {
  constructor(stage, dispatcher, renderer) {
    this.renderer = renderer
    this.stage = stage
    this.dispatch = dispatcher.getDispatch()

    this.runner = null
  }

  init() {
    this.runner = createRunner({
      renderer: this.renderer.renderer,
      root: this.stage.container,
      update: () => { this.dispatch('UPDATE') },
      fps: 10,
    })
  }

  start() {
    if (!this.runner) this.init()
    this.runner.start()
  }
}
