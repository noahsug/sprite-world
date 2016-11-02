import Smoothie from './bin/smoothie'
import * as pixi from 'pixi.js'

export default {
  createRunner: (options) => {
    return new Smoothie(Object.assign({ engine: pixi }, options))
  },
}
