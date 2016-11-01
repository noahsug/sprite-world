import { inject } from 'aurelia-dependency-injection'

import './debug'
import Dispatcher from './dispatcher'
import Reducer from './reducer'
import Ui from './ui'

@inject(Dispatcher, Reducer, Ui)
export default class App {
  constructor(dispatcher, reducer, ui) {
    this.dispatcher = dispatcher
    this.dispatcher.setReducer(reducer)
    this.ui = ui
  }

  attach(root) {
    this.dispatcher.dispatch('ATTACH', root)
  }
}
