import { inject } from 'aurelia-dependency-injection'
import { createRunner } from '../lib/smoothie'

import Stage from './stage'
import Dispatcher from './dispatcher'
import Renderer from './renderer'
import Game from './game'

@inject(Stage, Dispatcher, Renderer, Game)
export default class Runner {
  constructor(stage, dispatcher, renderer, game) {
    this.game = game
    this.renderer = renderer
    this.stage = stage
    this.dispatch = dispatcher.getDispatch()

    this.runner = null
  }

  start() {
    if (!this.runner) this.init()
    this.runner.start()
  }

  init() {
    this.runner = createRunner({
      renderer: this.renderer.renderer,
      root: this.stage.container,
      update: () => { this.dispatch('UPDATE') },
      fps: this.game.fps,
    })

    window.addEventListener('blur', () => {
      this.runner.pause()
    })

    window.addEventListener('focus', () => {
      this.runner.resume()
    })
  }

}
