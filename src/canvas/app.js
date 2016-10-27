import { inject } from 'aurelia-dependency-injection'

import './debug'
import Dispatcher from './dispatcher'
import Reducer from './reducer'

@inject(Dispatcher, Reducer)
export default class App {
  constructor(dispatcher, reducer) {
    this.dispatcher = dispatcher
    this.dispatcher.setReducer(reducer)
  }

  attach(root) {
    this.dispatcher.dispatch('ATTACH', root)
  }
}
