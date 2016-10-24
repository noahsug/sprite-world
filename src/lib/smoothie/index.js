import Smoothie from './bin/smoothie'
import pixi from 'pixi.js'

export default {
  createRunner: (options) => (
    new Smoothie(Object.assign({ engine: pixi }, options))
  ),
}
