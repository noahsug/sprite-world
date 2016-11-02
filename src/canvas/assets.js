import { loader, utils } from 'pixi.js'

const assetPath = (name) => `/assets/${name}.png`

const preloaded = [
  'goblin',
  'tilesheet',
  'snake',
  'unit',
]

export default class Assets {
  preload() {
    return new Promise((res) => {
      loader.add(preloaded.map(assetPath)).load(res)
    })
  }

  path(name) {
    return assetPath(name)
  }

  texture(name) {
    return utils.TextureCache[this.path(name)]
  }
}
